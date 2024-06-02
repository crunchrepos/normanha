import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FavoriteProductDocument,
  FavoriteProductSchema,
} from './database/favorite-product.schema';
import { AuthMock, FavoritesProductsMock } from '@mocks/testingMocks';

describe('ProductsController', () => {
  let productsController: ProductsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/shopify-favorites'),
        MongooseModule.forFeature([
          { name: 'Favorite-Products', schema: FavoriteProductSchema },
        ]),
      ],
      providers: [ProductsService],
      controllers: [ProductsController],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
  });

  it('ProductService - Should be defined', () => {
    expect(productsController).toBeDefined();
  });

  describe('Product Favorites - It should work as expected', () => {
    it('Add to Favorties - Should add a product to favorites and return the ID', async () => {
      jest
        .spyOn(productsController, 'addToFavorites')
        .mockImplementation(
          async () => FavoritesProductsMock.addToFavoriteResult,
        );

      expect(
        await productsController.addToFavorites(
          FavoritesProductsMock.addToFavoritePayload,
        ),
      ).toBe(FavoritesProductsMock.addToFavoriteResult);
    });

    it('Get User Favorites - Should return all user favorited products', async () => {
      jest
        .spyOn(productsController, 'getUserFavorites')
        .mockImplementation(
          async () =>
            FavoritesProductsMock.listOfFavorites as FavoriteProductDocument[],
        );

      expect(
        await productsController.getUserFavorites(
          AuthMock.userId as unknown as string,
        ),
      ).toBe(FavoritesProductsMock.listOfFavorites);
    });

    it('User Favorites - Should delete a user product from favorites', async () => {
      jest
        .spyOn(productsController, 'deleteUserFavorite')
        .mockImplementation(
          async () => FavoritesProductsMock.removeFromFavoriteResult,
        );

      expect(
        await productsController.deleteUserFavorite(
          FavoritesProductsMock.mockProductId,
        ),
      ).toBe(FavoritesProductsMock.removeFromFavoriteResult);
    });
  });
});
