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

  async addProductToFavorites(userId: Types.ObjectId, productId: string) {
    return await this.favoriteProductModel.create({
      userId: new Types.ObjectId(userId),
      productId,
    });
  }
  async getUserFavoriteProducts(userId: string) {
    return await this.favoriteProductModel.find({
      userId: new Types.ObjectId(userId),
    });
  }
}
