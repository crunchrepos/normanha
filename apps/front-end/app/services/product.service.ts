import {restApi} from './api';

export class ProductService {
  static URL = 'products';

  static async addToFavorites(userId: string, productId: string) {
    return restApi.post(`${this.URL}/favorites/add`, {userId, productId});
  }
  static async getAllUserFavorites(userId: string) {
    return restApi.get(`${this.URL}/favorites/${userId}`);
  }
}
