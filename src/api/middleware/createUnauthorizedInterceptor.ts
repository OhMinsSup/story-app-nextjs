// constants
import { STATUS_CODE } from '@constants/constant';

// utils
import { isFunction } from '@utils/assertion';

// types
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export interface AxiosOptions {
  statusCodes?: Array<number>; // http status과 일치할 경우 refresh token 발급
  shouldBlock?(error: AxiosError): boolean; // status 코드가 아닌 이유로 refresh token 발급이 필요할 경우 (인터셉터를 실행할 여러 상태 코드를 지정 가능)
}

interface FailedQueue {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false; // isTokenRefreshing이 false인 경우에만 token refresh 요청
let failedQueue: FailedQueue[] = []; // 실패한 api 호출을 위한 큐

const processQueue = (error?: any | null, token?: string | null) => {
  failedQueue.forEach((queue) => {
    if (error) {
      queue.reject(error);
    } else {
      queue.resolve(token);
    }
  });

  failedQueue = [];
};

const shouldInterceptError = (error: AxiosError, options: AxiosOptions) => {
  if (!error) {
    return false;
  }

  if (!error.response) {
    return false;
  }

  const { statusCodes = [], shouldBlock = undefined } = options;

  if (isFunction(shouldBlock)) {
    const conditionShould = shouldBlock(error);
    return conditionShould;
  }

  const conditionStatusCode = statusCodes.includes(error.response.status);
  return conditionStatusCode;
};

export const createUnauthorizedInterceptor = (
  instance: AxiosInstance,
  options: AxiosOptions = {},
) => {
  const { statusCodes = [STATUS_CODE.UNAUTHORIZED], shouldBlock = undefined } =
    options || {};

  return instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: any) => {
      if (!shouldInterceptError(error, { statusCodes, shouldBlock })) {
        return Promise.reject(error);
      }

      // 이미 refresh token을 발급하고 있는 경우
      if (error.config._retry || error.config._queued) {
        return Promise.reject(error);
      }

      const originalRequest = error.config;

      // token이 재발급 되는 동안의 요청은 failedQueue에 저장
      if (isRefreshing) {
        try {
          await new Promise((resolve, reject) =>
            failedQueue.push({ resolve, reject }),
          );

          originalRequest._queued = true;

          return Promise.reject(error);
        } catch {
          return Promise.reject(error);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        processQueue(null, null);
        return error;
      } catch (error) {
        processQueue(error, null);
        return Promise.reject(error);
      } finally {
        // 발급하면 해제
        isRefreshing = false;
      }
    },
  );
};
