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
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('favorites/user/product/add')
  addToFavorites(@Body() favoritesDto: any) {
    return this.productsService.addProductToFavorites(
      favoritesDto.userId,
      favoritesDto.productId,
    );
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('favorites/user/:id/products')
  getUserFavorites(@Param() id: string) {
    return this.productsService.getUserFavoriteProducts(id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Delete('favorites/user/:userId/product/:productId')
  deleteUserFavorite(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.productsService.deleteFavorite(userId, productId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('favorites/user/:userId/product/:productId')
  getFavoriteProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.productsService.getFavoriteProduct(userId, productId);
  }
}
