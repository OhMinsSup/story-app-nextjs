export const PAGE_ENDPOINTS = {
  INDEX: '/',
  LOGIN: '/login/',
  SIGNUP: '/signup/',
  ILLUSTRATION: '/illustration/',
  PUBLISH: '/publish/',
};

export const API_ENDPOINTS = {
  MOCK: {
    ILLUSTRATION: '/mock-list.json',
  },
  LOCAL: {
    AUTH: {
      LOGIN: '/users/signin',
      SIGNUP: '/users/signup',
    },
    FILE: {
      ROOT: '/files/upload',
    },
    STORY: {
      ROOT: '/story',
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

export const RESULT_CODE = {
  // 성공
  OK: 0,
  // 잘못된 패스워드
  INCORRECT_PASSWORD: 4004,
  // 존재하지 않음
  NOT_EXIST: 2001,
  // 삭제됨
  DELETED: 2002,
  // 이미 존재함
  ALREADY_EXIST: 2003,
  // 유효하지 않음
  INVALID: 2004,
  // 지원하지 않음.
  NOT_SUPPORTED: 2005,
  // 중복된 값
  DUPLICATE: 2006,
  // 삭제 권한이 없음
  NO_PERMISSION: 2007,

  // 만료된 토큰
  TOKEN_EXPIRED: 4001,
  // 리프레시 토큰 만료
  EXPIRED_REFRESH_TOKEN: 4002,
  // 유효하지 않는 토큰
  INVALID_TOKEN: 4003,
  // 만료된 서명 토큰
  SIGNATURE_TOKEN: 4004,
};
