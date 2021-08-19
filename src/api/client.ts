import axios from 'axios';
import { API_HOST, IS_PROD } from 'src/constants/env';

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
client.interceptors.response.use((response) => {
  if (!IS_PROD && typeof window !== 'undefined') {
    // * 브라우저에서 개발 중에 어떠한 응답이 수신되고 있는지를 알려줍니다.
    console.log(
      `%c📫 API 응답 수신  주소:${
        response.config.url
      } 유형:${response.config.method?.toUpperCase()}`,
      'color: #31B4D9;',
      response,
    );
  }

  return response;
});
