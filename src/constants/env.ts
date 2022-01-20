export const IS_DEPLOY_GROUP_PROD = process.env.DEPLOY_GROUP === 'production';
export const IS_PROD = process.env.NODE_ENV === 'production';

export const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export const FIREBASE_VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
export const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
