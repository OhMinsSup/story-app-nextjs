import { STATUS_CODE } from '@constants/constant';
import * as Sentry from '@sentry/browser';

// types
import type { AxiosError } from 'axios';

export interface AxiosOptions {
  statusCodes?: Array<number>; // http status과 일치할 경우 refresh token 발급
  shouldBlock?(error: AxiosError): boolean; // status 코드가 아닌 이유로 refresh token 발급이 필요할 경우 (인터셉터를 실행할 여러 상태 코드를 지정 가능)
}

const shouldInterceptError = (error: AxiosError) => {
  if (!error) {
    return false;
  }

  if (!error.response) {
    return false;
  }

  const statusCodes = [STATUS_CODE.UNAUTHORIZED];

  const conditionStatusCode = statusCodes.includes(error.response.status);
  if (error.response.status >= STATUS_CODE.SERVER_ERROR) {
    Sentry.captureException(error);
  }

  return conditionStatusCode;
};

export const createErrorLogInterceptor = (error: AxiosError) => {
  if (!shouldInterceptError(error)) {
    return Promise.reject(error);
  }

  return Promise.reject(error);
};
