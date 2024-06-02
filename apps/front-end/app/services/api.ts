import axios from 'axios';

export const createRestAPI = (access_token?: string) =>
  axios.create({
    baseURL: 'http://localhost:3123',
    headers: {
      'Content-Type': 'application/json',
      Authorization: access_token ? `Bearer ${access_token}` : '',
    },
    withCredentials: true,
  });
