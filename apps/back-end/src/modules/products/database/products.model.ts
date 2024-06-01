import { Types } from 'mongoose';

export interface FavoriteProductModel {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  productId: string;
}
