import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Types } from 'mongoose';
import { FavoriteProduct } from 'src/models/products.model';
import { FavoriteProductDocument } from 'src/schemas/favorite-product.schema';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
  });

  it('should add a product to favorites', async () => {
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

  it('should fetch the users favorites products', async () => {
    const userId = '665929e2f03ef2a6a9eba95b';

    const result: FavoriteProduct[] = [
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

  it('should delete the users favorite product', async () => {
    const _id = '665929e2f03ef2a6a9eba95b';

    const result = {
      message: 'Deleted Favorite Succesfully!',
    };

    jest
      .spyOn(productsService, 'deleteFavorite')
      .mockImplementation(async () => result);

    expect(await productsController.deleteUserFavorite(_id)).toBe(result);
  });

  it('should fetch only 1 favorite product', async () => {
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
