import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type FavoriteProductDocument = HydratedDocument<FavoriteProduct>;

@Schema()
export class FavoriteProduct {
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  productId: string;
}

export const FavoriteProductSchema =
  SchemaFactory.createForClass(FavoriteProduct);
