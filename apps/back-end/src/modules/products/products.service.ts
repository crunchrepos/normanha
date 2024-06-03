import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FavoriteProductModel } from './database/products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Favorite-Products')
    private favoriteProductModel: Model<FavoriteProductModel>,
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

  async deleteFavorite(userId: string, productId: string) {
    await this.favoriteProductModel.deleteOne({
      userId: new Types.ObjectId(userId),
      productId,
    });
    return {
      message: 'Deleted Favorite Succesfully!',
    };
  }

  async getFavoriteProduct(userId: string, productId: string) {
    const product = await this.favoriteProductModel.findOne({
      userId: new Types.ObjectId(userId),
      productId,
    });
    if (!product) return null;
    return product;
  }
}
