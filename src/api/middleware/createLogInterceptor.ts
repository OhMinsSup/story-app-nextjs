// types
import { IS_PROD } from '@constants/env';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export const createResponseLogInterceptor = (response: AxiosResponse) => {
  if (!IS_PROD) {
    console.log(
      `%c📫 API 응답 수신 주소:${
        response.config.url
      } 유형:${response.config.method?.toUpperCase()} \nAPI상태코드:0`,
      'color: #69db7c;',
      response,
    );
  }

  return response;
};

export const createRequestLogInterceptor = (config: AxiosRequestConfig) => {
  if (!IS_PROD) {
    console.log(
      `%c📦 API 요청 송신  주소:${
        config.url
      } 유형:${config.method?.toUpperCase()}`,
      'color: #E19A56;',
      config.params,
    );
  }

  return config;
};
