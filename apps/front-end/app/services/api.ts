import axios from 'axios';

export const restApi = axios.create({
  baseURL: 'http://localhost:3123',
  headers: {
    'Content-Type': 'application/json',
  },
});
