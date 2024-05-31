import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('favorites/add')
  addToFavorites(@Body() favoritesDto: any) {
    return this.productsService.addProductToFavorites(
      favoritesDto.userId,
      favoritesDto.productId,
    );
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('favorites/user/:id')
  getUserFavorites(@Param() id: string) {
    return this.productsService.getUserFavoriteProducts(id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Delete('favorites/:id')
  deleteUserFavorite(@Param() id: string) {
    return this.productsService.deleteFavorite(id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('favorites/user/product/:id')
  getFavoriteProduct(@Param('id') id: string) {
    return this.productsService.getFavoriteProduct(id);
  }
}
