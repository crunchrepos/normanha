import axios, {AxiosHeaders} from 'axios';
import {UserSession} from '~/types/user.types';

export const restApi = axios.create({
  baseURL: 'http://localhost:3123',
  headers: {
    'Content-Type': 'application/json',
  },
});

restApi.interceptors.request.use(
  (config) => {
    const session = localStorage.getItem('userSession');
    if (session) {
      const userSession: UserSession = JSON.parse(session) as UserSession;
      if (userSession) {
        config.headers['Authorization'] = `Bearer ${userSession.access_token}`;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
