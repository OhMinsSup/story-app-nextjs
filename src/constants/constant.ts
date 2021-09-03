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
    },
  },
};

export const WEB_APP = '@@StoryFront';

export const STORAGE_KEY = {
  TOKEN_KEY: `${WEB_APP}/authToken`,
  USER_KEY: `${WEB_APP}/userInfo`,
};
