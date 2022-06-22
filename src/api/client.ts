import axios from 'axios';
import { API_HOST } from '@constants/env';
import { createErrorInterceptor } from './middleware/createErrorInterceptor';

export const client = axios.create({
  baseURL: API_HOST,
  withCredentials: true,
});

createErrorInterceptor(client);
