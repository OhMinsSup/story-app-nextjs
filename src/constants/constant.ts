export const PAGE_ENDPOINTS = {
  INDEX: '/',
  LOGIN: '/login/',
  SIGNUP: '/signup/',
  ILLUSTRATION: '/illustration/',
};

export const API_ENDPOINTS = {
  MOCK: {
    ILLUSTRATION: '/mock-list.json',
  },
  LOCAL: {
    AUTH: {
      LOGIN: '/auth/login',
      SIGNUP: '/auth/signup',
    },
  },
};

export const WEB_APP = '@@StoryFront';

export const STORAGE_KEY = {
  TOKEN_KEY: `${WEB_APP}/authToken`,
  USER_KEY: `${WEB_APP}/userInfo`,
};

export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOED: 405,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,

  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
};
