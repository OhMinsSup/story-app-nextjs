import axios from 'axios';
import { QueryClient } from 'react-query';
import { API_HOST } from '@constants/env';
import { createInterceptor } from './middleware/createInterceptor';

// error
import { ApiError } from '@libs/error';

// constants
import { STATUS_CODE } from '@constants/constant';

// utils
import { notifyManager, NOFIFY_DATA } from '@libs/state/notify';

export const client = axios.create({
  baseURL: API_HOST,
  withCredentials: true,
});

createInterceptor(client);

const onError = (error: unknown) => {
  if (ApiError.isAxiosError(error)) {
    const statusCode = error.response?.status ?? -1;
    const check = [STATUS_CODE.UNAUTHORIZED, STATUS_CODE.FORBIDDEN].includes(
      statusCode,
    );
    if (check) {
      notifyManager.schedule(() => {
        return NOFIFY_DATA.SESSION(statusCode);
      });
    }
  }
};

const retry = (failureCount: number, error: unknown) => {
  if (ApiError.isAxiosError(error)) {
    const statusCode = error.response?.status ?? -1;
    const check = [STATUS_CODE.UNAUTHORIZED, STATUS_CODE.FORBIDDEN].includes(
      statusCode,
    );
    return !check;
  }
  if (failureCount >= 5) return false;
  return true;
};

// 백오프지수
const retryDelay = (failureCount: number) =>
  Math.min(1000 * 2 ** failureCount, 30000);

export const globalClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay,
      retry,
      onError,
    },
    mutations: {
      retry: false,
      onError,
    },
  },
});
