import {AxiosInstance} from 'axios';

export class ProductService {
  URL = 'products';
  axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }
  async addToFavorites(userId: string, productId: string) {
    return this.axiosInstance.post(`${this.URL}/favorites/add`, {
      userId,
      productId,
    });
  }
  async getAllUserFavorites(userId: string) {
    return this.axiosInstance.get(`${this.URL}/favorites/user/${userId}`);
  }
  async getFavoriteProduct(productId: string) {
    return this.axiosInstance.get(
      `${this.URL}/favorites/user/product/${productId}`,
    );
  }
  async deleteProductFromFavorite(id: string) {
    return this.axiosInstance.delete(`${this.URL}/favorites/${id}`);
  }
}
