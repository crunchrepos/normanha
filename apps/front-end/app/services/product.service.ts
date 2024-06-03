import {AxiosInstance} from 'axios';

export class ProductService {
  URL = 'products';
  axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }
  async addToFavorites(userId: string, productId: string) {
    console.log({userId, productId});
    return this.axiosInstance.post(`${this.URL}/favorites/user/product/add`, {
      userId,
      productId,
    });
  }
  async getAllUserFavorites(userId: string) {
    return this.axiosInstance.get(
      `${this.URL}/favorites/user/${userId}/products`,
    );
  }
  async getFavoriteProduct(userId: string, productId: string) {
    return this.axiosInstance.get(
      `${this.URL}/favorites/user/${userId}/product/${productId}`,
    );
  }
  async deleteProductFromFavorite(userId: string, productId: string) {
    return this.axiosInstance.delete(
      `${this.URL}/favorites/user/${userId}/product/${productId}`,
    );
  }
}
