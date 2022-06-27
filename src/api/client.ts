import axios from 'axios';
import { API_HOST } from '@constants/env';
import { createInterceptor } from './middleware/createInterceptor';

export const client = axios.create({
  baseURL: API_HOST,
  withCredentials: true,
});

createInterceptor(client);
