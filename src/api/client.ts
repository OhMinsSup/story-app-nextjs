import axios from 'axios';
import { PAGE_ENDPOINTS, STATUS_CODE, STORAGE_KEY } from '@constants/constant';
import { API_HOST, IS_PROD } from '@constants/env';

export const client = axios.create({
  baseURL: API_HOST,
});

// * 요청이 발생하기 전에 작동합니다.
client.interceptors.request.use((config) => {
  if (!IS_PROD && typeof window !== 'undefined') {
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
    if (!IS_PROD && typeof window !== 'undefined') {
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
  (error) => {
    // 전역으로 에러팝업이 필요
    // 401 -> login page
    // 400, 403, 404 -> 잘못된호출
    // http status error (200을 제와한 모든경우) -> 잘못된호출
    if (error.response) {
      const { response } = error;
      if (response.status >= 500) {
        // TODO: Sentry
      }

      if (response.status === STATUS_CODE.UNAUTHORIZED) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(STORAGE_KEY.TOKEN_KEY);
          // localStorage.removeItem(STORAGE_KEY.USER_KEY);
          sessionStorage.removeItem(STORAGE_KEY.USER_KEY);
          location.href = PAGE_ENDPOINTS.INDEX;
        }
      } else {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
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
    }

    throw error;
  },
);
