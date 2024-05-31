import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {
  Pagination,
  getPaginationVariables,
  Image,
  Money,
} from '@shopify/hydrogen';
import type {ProductItemFragment} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {useEffect, useState} from 'react';
import {ProductService} from '~/services/product.service';
import {FavoriteProduct} from '~/types/products.types';
import {Product} from '@shopify/hydrogen/storefront-api-types';
import {UserSession, UserSession} from '~/types/user.types';
import {Jsonify} from '@remix-run/server-runtime/dist/jsonify';

export const meta: MetaFunction<typeof loader> = () => {
  return [{title: `Hydrogen | Products`}];
};

export async function loader({request, context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 40,
  });

  const {products} = await storefront.query(CATALOG_QUERY, {
    variables: {...paginationVariables},
  });

  return json({products});
}

export default function Collection() {
  const {products} = useLoaderData<typeof loader>();
  const [userSession, setUserSession] = useState<UserSession>();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  function getUserSession() {
    const response = localStorage.getItem('userSession');
    if (response) {
      const parsedResponse = JSON.parse(response);

      setUserSession(parsedResponse as unknown as UserSession);
    }
  }

  async function handleGetFavorites() {
    if (!userSession) return null;
    const response = await ProductService.getAllUserFavorites(
      userSession.user._id,
    );
    if (response.status === 200) {
      let favoriteProductsMap: Product[] = [];
      response.data.forEach((favorite: FavoriteProduct) => {
        const product = products.nodes.find((product) => {
          const splittedProductId = product.id.split('/');

          return (
            splittedProductId[splittedProductId.length - 1] ===
            favorite.productId
          );
        });
        if (product) {
          favoriteProductsMap.push(product as Product);
        }
      });
      setFavoriteProducts(favoriteProductsMap);
    }
  }

  useEffect(() => {
    getUserSession();
  }, [products]);

  useEffect(() => {
    handleGetFavorites();
  }, [userSession]);

  return (
    <div className="collection">
      <h1>Favorites</h1>
      <Pagination connection={products}>
        {({isLoading, PreviousLink, NextLink}) => (
          <>
            <PreviousLink>
              {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
            </PreviousLink>
            <ProductsGrid products={favoriteProducts} />
            <br />
            <NextLink>
              {isLoading ? 'Loading...' : <span>Load more ↓</span>}
            </NextLink>
          </>
        )}
      </Pagination>
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

// NOTE: https://shopify.dev/docs/api/storefront/2024-01/objects/product
const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...ProductItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${PRODUCT_ITEM_FRAGMENT}
` as const;
