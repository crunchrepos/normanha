import {AxiosResponse} from 'axios';
import {restApi} from './api';

interface AuthResponse {
  access_token: string;
  user: {
    _id: string;
    email: string;
  };
}
export class AuthService {
  static URL = 'auth';

  static async signIn(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse, unknown>> {
    return await restApi.post(`${this.URL}/sign-in`, {email, password});
  }

  static async signUp(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse, unknown>> {
    return await restApi.post(`${this.URL}/sign-up`, {email, password});
  }
}
