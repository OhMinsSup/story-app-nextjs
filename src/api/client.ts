import axios from 'axios';
import { API_HOST } from '@constants/env';
import {
  createRequestLogInterceptor,
  createResponseLogInterceptor,
} from './middleware/createLogInterceptor';
import { createErrorLogInterceptor } from './middleware/createErrorLogInterceptor';

export const client = axios.create({
  baseURL: API_HOST,
  withCredentials: true,
});

// 요청이 발생하기 전에 작동합니다.
client.interceptors.request.use(createRequestLogInterceptor);

client.interceptors.response.use(
  createResponseLogInterceptor,
  createErrorLogInterceptor,
);
