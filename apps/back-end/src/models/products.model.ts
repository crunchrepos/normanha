import { Types } from 'mongoose';

export interface FavoriteProduct {
  userId: Types.ObjectId;
  productId: string;
}
