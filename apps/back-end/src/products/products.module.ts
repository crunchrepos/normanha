import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteProductSchema } from 'src/schemas/favorite-product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Favorite-Products', schema: FavoriteProductSchema },
    ]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
