import axios from 'axios';
import * as Sentry from '@sentry/browser';
import { API_HOST, IS_PROD } from '@constants/env';
import { isBrowser } from '@utils/utils';

export const client = axios.create({
  baseURL: API_HOST,
  withCredentials: true,
});

// * 요청이 발생하기 전에 작동합니다.
client.interceptors.request.use((config) => {
  if (!IS_PROD && isBrowser) {
    // * 브라우저에서 개발 중에 어떠한 요청이 송신되고 있는지를 알려줍니다.
    console.log(
      `%c📦 API 요청 송신  주소:${
        config.url
      } 유형:${config.method?.toUpperCase()}`,
      'color: #E19A56;',
      config.params,
    );
  }

  return config;
});

// * 요청이 발생한 후에 작동합니다.
client.interceptors.response.use(
  (response) => {
    if (!IS_PROD && isBrowser) {
      // * 브라우저에서 개발 중에 어떠한 응답이 수신되고 있는지를 알려줍니다.
      console.log(
        `%c📫 API 응답 수신 주소:${
          response.config.url
        } 유형:${response.config.method?.toUpperCase()} \nAPI상태코드:0`,
        'color: #69db7c;',
        response,
      );
    }

    return response;
  },
  async (error) => {
    if (error.response) {
      const { response } = error;
      if (response.status >= 500) {
        Sentry.captureException(error);
      }

      console.log(
        `%c🚫 HTTP Error 응답 수신 주소:${
          response.config.url
        } 유형:${response.config.method?.toUpperCase()} \n상태코드:${
          response.status
        }`,
        'color: #e03131;',
        response,
      );
    }

    throw error;
  },
);
