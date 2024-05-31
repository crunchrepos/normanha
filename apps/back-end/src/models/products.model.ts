import { Types } from 'mongoose';

export interface FavoriteProduct {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  productId: string;
}
