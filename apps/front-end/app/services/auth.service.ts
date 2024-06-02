import {AxiosInstance, AxiosResponse} from 'axios';

interface AuthResponse {
  access_token: string;
  user: {
    _id: string;
    email: string;
  };
}
export class AuthService {
  URL = 'auth';
  axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse, unknown>> {
    return await this.axiosInstance.post(`${this.URL}/sign-in`, {
      email,
      password,
    });
  }

  async signUp(
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse, unknown>> {
    return await this.axiosInstance.post(`${this.URL}/sign-up`, {
      email,
      password,
    });
  }
}
