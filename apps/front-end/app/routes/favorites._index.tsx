import {json, redirect, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {ProductService} from '~/services/product.service';
import {FavoriteProduct} from '~/types/products.types';
import {UserSessionManager} from '~/lib/session';
import {createRestAPI} from '~/services/api';

export const meta: MetaFunction<typeof loader> = () => {
  return [{title: `Hydrogen | Products`}];
};

export async function loader({request, context}: LoaderFunctionArgs) {
  const {storefront} = context;
  // Get the current user session
  const session = await UserSessionManager.getSession(
    request.headers.get('Cookie'),
  );

  // Populate the Cookie datas to a session object
  const userSession = {
    access_token: session.get('access_token'),
    user: session.get('user'),
  };

  // Validate if we have the access token and the user ID to make the call to our Rest API
  if (userSession.access_token && userSession.user?._id) {
    // Create the API Instance with the authentication token
    const axiosInstance = createRestAPI(userSession.access_token);
    const productService = new ProductService(axiosInstance);
    try {
      const response = await productService.getAllUserFavorites(
        userSession.user._id,
      );

      // If token has expired, redirect to home page and remove session
      if (response.status === 401) {
        alert('Your session has expired!');
        const cookieData = await UserSessionManager.destroySession(session);
        return redirect('/', {
          headers: {
            'Set-Cookie': cookieData,
          },
        });
      }
      // If token is valid, continue the flow
      if (response.status === 200) {
        // Map our favorite ID's to use in our GraphQL Query
        const favoriteIds: string[] = response.data.map(
          (favorite: FavoriteProduct) =>
            `gid://shopify/Product/${favorite.productId}`,
        );

        // Early return in case the user doesn't have a product favorited
        if (favoriteIds.length === 0) return json({products: []});

        // Fetch the products with the ids as variables
        const result = await storefront.query(
          PRODUCT_FAVORITES_QUERY(favoriteIds),
          {
            variables: {ids: favoriteIds},
          },
        );

        // Return the nodes to the main component
        return json({products: result.nodes});
      }
    } catch (error: unknown) {
      const cookieData = await UserSessionManager.destroySession(session);
      return redirect('/', {
        headers: {
          'Set-Cookie': cookieData,
        },
      });
    }
  }
}

export default function Collection() {
  const {products} = useLoaderData<typeof loader>();
  return (
    <div className="collection">
      <h1>Favorites</h1>
      <ProductsGrid products={products} />
    </div>
  );
}

function ProductsGrid({products}: {products: ProductItemFragment[]}) {
  return (
    <div className="products-grid">
      {products.map((product, index) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < 8 ? 'eager' : undefined}
          />
        );
      })}
    </div>
  );
}

function ProductItem({
  product,
  loading,
}: {
  product: ProductItemFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variant = product.variants.nodes[0];
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  return (
    <Link
      className="product-item"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {product.featuredImage && (
        <Image
          alt={product.featuredImage.altText || product.title}
          aspectRatio="1/1"
          data={product.featuredImage}
          loading={loading}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}
      <h4>{product.title}</h4>
      <small>
        <Money data={product.priceRange.minVariantPrice} />
      </small>
    </Link>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        selectedOptions {
          name
          value
        }
      }
    }
  }
` as const;

const PRODUCT_FAVORITES_QUERY = (favoriteProductsIds: string[]) => `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query getFavoritedProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
       ... on Product {
         ...ProductItem
      }
    }
  }
`;
