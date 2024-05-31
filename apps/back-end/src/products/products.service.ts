import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FavoriteProduct } from 'src/models/products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Favorite-Products')
    private favoriteProductModel: Model<FavoriteProduct>,
  ) {}

  async addProductToFavorites(userId: string, productId: string) {
    await this.favoriteProductModel.create({
      userId: new Types.ObjectId(userId),
      productId,
    });

    return {
      productId,
    };
  }
  async getUserFavoriteProducts(userId: string) {
    const products = await this.favoriteProductModel.find({
      userId: new Types.ObjectId(userId),
    });

    return products;
  }

  async deleteFavorite(id: string) {
    await this.favoriteProductModel.deleteOne({
      _id: new Types.ObjectId(id),
    });
    return {
      message: 'Deleted Favorite Succesfully!',
    };
  }

  async getFavoriteProduct(productId: string) {
    console.log({ productId });
    return await this.favoriteProductModel.findOne({ productId });
  }
}
