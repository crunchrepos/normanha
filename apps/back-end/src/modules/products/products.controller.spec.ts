import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Types } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FavoriteProductDocument,
  FavoriteProductSchema,
} from './database/favorite-product.schema';
import { FavoriteProductModel } from './database/products.model';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;
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
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('ProductService - Should be defined', () => {
    expect(productsController).toBeDefined();
  });

  describe('Product Favorites - It should work as expected', () => {
    it('Add to Favorties - Should add a product to favorites and return the ID', async () => {
      const payload = {
        userId: '665929e2f03ef2a6a9eba95b',
        productId: 'gid://shopify/Product/7983591030806',
      };

      const result = {
        productId: 'gid://shopify/Product/7983591030806',
      };

      jest
        .spyOn(productsService, 'addProductToFavorites')
        .mockImplementation(async () => result);

      expect(await productsController.addToFavorites(payload)).toBe(result);
    });

    it('Get User Favorites - Should return all user favorited products', async () => {
      const userId = '665929e2f03ef2a6a9eba95b';

      const result: FavoriteProductModel[] = [
        {
          _id: new Types.ObjectId('6659659d95df5706397961fc'),
          userId: new Types.ObjectId(userId),
          productId: '7983591030806',
        },
        {
          _id: new Types.ObjectId('665965b795df5706397961fe'),
          userId: new Types.ObjectId(userId),
          productId: '7783591030206',
        },
        {
          _id: new Types.ObjectId('665965e895df570639796201'),
          userId: new Types.ObjectId(userId),
          productId: '7783591030206',
        },
      ];

      jest
        .spyOn(productsService, 'getUserFavoriteProducts')
        .mockImplementation(async () => result as FavoriteProductDocument[]);

      expect(await productsController.getUserFavorites(userId)).toBe(result);
    });

    it('User Favorites - Should delete a user product from favorites', async () => {
      const _id = '665929e2f03ef2a6a9eba95b';

      const result = {
        message: 'Deleted Favorite Succesfully!',
      };

      jest
        .spyOn(productsService, 'deleteFavorite')
        .mockImplementation(async () => result);

      expect(await productsController.deleteUserFavorite(_id)).toBe(result);
    });

    it('User Favorite - Should get only 1 favorited product', async () => {
      const _id = '665929e2f03ef2a6a9eba95b';
      const result = {
        _id: new Types.ObjectId('665965e895df570639796201'),
        userId: new Types.ObjectId('665929e2f03ef2a6a9eba95b'),
        productId: '7783591030206',
      };
      jest
        .spyOn(productsService, 'getFavoriteProduct')
        .mockImplementation(async () => result as FavoriteProductDocument);

      expect(await productsController.getFavoriteProduct(_id));
    });
  });
});
