import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @HttpCode(HttpStatus.OK)
  @Post('favorites/add')
  addToFavorites(@Body() favoritesDto: any) {
    return this.productsService.addProductToFavorites(
      favoritesDto.userId,
      favoritesDto.productId,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Get('favorites/user/:id')
  getUserFavorites(@Param() id: string) {
    return this.productsService.getUserFavoriteProducts(id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('favorites/:id')
  deleteUserFavorite(@Param() id: string) {
    return this.productsService.deleteFavorite(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('favorites/user/product/:id')
  getFavoriteProduct(@Param('id') id: string) {
    return this.productsService.getFavoriteProduct(id);
  }
}
