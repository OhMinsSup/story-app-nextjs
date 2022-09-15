export const PAGE_ENDPOINTS = {
  INDEX: '/',
  LOGIN: '/login/',
  SIGNUP: '/signup/',
  NFT: {
    ROOT: '/nft/',
    ID: (id: string | number) => `/nft/${id}/`,
    REGIST: '/nft/regist/',
  },
  EXPLORE: {
    ROOT: '/explore/',
  },
  AUTH: {
    SIGNIN: '/auth/signin/',
    SIGNUP: '/auth/signup/',
  },
};

export const API_ENDPOINTS = {
  LOCAL: {
    AUTH: {
      LOGIN: '/users/signin',
      SIGNUP: '/users/signup',
      LOGOUT: '/users/logout',
    },
    USER: {
      ROOT: '/users',
      ME: '/users/me',
      DETAIL: (id: string | number) => `/users/${id}`,
      UNREGIISTER: (id: string | number) => `/users/${id}/unregister`,
    },
    FILE: {
      ROOT: '/files/upload',
      LIST: '/files',
    },
    SEARCH: {
      ROOT: '/search',
    },
    TAGS: {
      ROOT: '/tags',
    },
    NOTIFICATIONS: {
      ROOT: '/notifications',
      PUSH: '/notifications/push',
      DEVICE: '/notifications/device',
    },
    DEVICE: {
      ROOT: '/devices',
    },
    STORY: {
      // news
      ROOT: '/stories',
      ID: (id: string | number) => `/stories/${id}`,
      // old
      DETAIL: (id: string | number) => `/stories/${id}`,
      HISTORIES: (id: string | number) => `/stories/${id}/histories`,
      ANOTHERS: (id: string | number, userId: string | number) =>
        `/stories/${id}/anothers/${userId}`,
      LIKE: (id: string | number) => `/stories/${id}/like`,
      LIKES: (id: string | number) => `/stories/${id}/likes`,
      STATUS: (id: string | number) => `/stories/${id}/status`,
      NFT: {
        ROOT: '/stories/nft',
        BUYER: (id: string | number) => `/stories/nfts/${id}/buyer`,
        SELLER: (id: string | number) => `/stories/nfts/${id}/seller`,
        HISTORIES: (id: string | number) => `/stories/${id}/nfts/histories`,
        OFFERS: (id: string | number) => `/stories/${id}/nfts/offers`,
      },
    },
  },
  APP: {
    AUTH: {
      SIGNIN: '/auth/signin', // 일반 로그인
      SIGNUP: '/auth/signup', // 일반 회원가입
      LOGOUT: '/auth/logout', // 로그아웃
      KEYSTORE: {
        SIGNIN: '/auth/keystore/signin', // keystore 로그인
        SIGNUP: '/auth/keystore/signup', // keystore 회원가입
      },
    },
    USERS: {
      ME: '/users', // 내정보
    },
    UPLOAD: {
      FILE: '/files/upload', // 파일 업로드
    },
  },
};

export const QUERIES_KEY = {
  ME: [API_ENDPOINTS.APP.USERS.ME],
  FILE_LIST: [API_ENDPOINTS.LOCAL.FILE.LIST],
};

export const WEB_APP = '@@StoryFront';

export const STORAGE_KEY = {
  TOKEN_KEY: `${WEB_APP}/authToken`,
  USER_KEY: `${WEB_APP}/userInfo`,
  PUSH_TOKEN_KEY: `${WEB_APP}/pushToken`,
  THEME_KEY: `${WEB_APP}/story-color-scheme`,
};

export const COOKIE_KEY = {
  ACCESS_TOKEN: 'access_token',
  THEME: 'theme_schema',
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
  INCORRECT_PASSWORD: 2000,
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
  // 지갑 주소 중복
  ALREADY_EXIST_FOR_WALLET: 2008,
  // 유효하지 않는 json 파일
  INVALID_JSON_FILE: 2009,

  // 만료된 토큰
  TOKEN_EXPIRED: 4001,
  // 리프레시 토큰 만료
  EXPIRED_REFRESH_TOKEN: 4002,
  // 유효하지 않는 토큰
  INVALID_TOKEN: 4003,
  // 만료된 서명 토큰
  SIGNATURE_TOKEN: 4004,

  // 자신이 생성한 아이템에 좋아요등의 액션을 할 수 없음
  NO_PERMISSION_ACTION: 4005,
  // NFT 발생 실패
  NFT_FAIL: 4006,
  // PUSH_TOKEN 만료
  PUSH_TOKEN_EXPIRED: 4007,

  // 가격이 존재하지 않는 경우
  NO_PRICE: 5000,
  // 가격을 제시할 수 없음
  NO_PRICE_ACTION: 5001,
  // 가격을 비교했을 떄 너무 낮음
  PRICE_TOO_LOW: 5002,
  // Klaytn 단위가 올바르지 않는 경우
  INVALID_PARAM: 5003,
  // klaytn 지갑 생성 오류
  WALLET_GENERATE_ERROR: 5004,
};

export const ASSETS_IMAGES = {
  VECTOR_01: '/images/vector_01.png',
  VECTOR_HLW: '/images/vector_hlw.svg',
  ABOUT_HERO_RIGHT: '/images/about_hero_right.png',
  HIW_01: '/images/hlw_01.png',
  HIW_02: '/images/hlw_02.png',
  HIW_03: '/images/hlw_03.png',
  HIW_04: '/images/hlw_04.png',
};
