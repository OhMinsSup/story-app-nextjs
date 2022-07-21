import { STORAGE_KEY } from '@constants/constant';
import qs from 'qs';
import axios from 'axios';

import type { MutableRefObject } from 'react';
import type { AxiosError } from 'axios';
import type { Schema } from '@api/schema/story-api';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const multiavatar = require('@multiavatar/multiavatar');

export type BasicTarget<T = HTMLElement> =
  | (() => T | null)
  | T
  | null
  | MutableRefObject<T | null | undefined>;

export const makeQueryString = (params: any) => {
  const stringify = qs.stringify(params, {
    arrayFormat: 'comma',
    skipNulls: true,
    addQueryPrefix: true,
  });
  return stringify;
};

// valid check key store file
export const validKeystore = (keystore?: string | ArrayBuffer | null) => {
  if (!keystore) return false;
  if (keystore instanceof ArrayBuffer) {
    keystore = JSON.stringify(Array.from(new Uint8Array(keystore)));
  }

  const parsedKeystore = JSON.parse(keystore);
  const keys = ['version', 'id', 'address', 'keyring'];
  return keys.every((key) => parsedKeystore[key]);
};

export const userInfo = () => {
  if (typeof window === 'undefined') return null;
  const stringify = localStorage.getItem(STORAGE_KEY.USER_KEY);
  if (!stringify) return null;
  return JSON.parse(stringify) ?? null;
};

export function isAxiosError<R = any>(
  error: AxiosError | any,
): error is Required<AxiosError<Schema<R>>> {
  return error && axios.isAxiosError(error);
}

export const generateKey = () => {
  return Math.random().toString(36).substr(2, 11);
};

export const generateAvatar = (key: string) => {
  const svgCode = multiavatar(key);
  return svgCode;
};

type UserProfileImage = {
  defaultProfile: boolean;
  avatarSvg?: string | null;
  profileUrl?: string | null;
  nickname?: string;
};

export const getUserThumbnail = (data?: UserProfileImage) => {
  if (!data) return '';
  const { defaultProfile, avatarSvg, profileUrl, nickname } = data;
  const svgCode = `data:image/svg+xml;utf8,${encodeURIComponent(
    generateAvatar(avatarSvg ?? nickname ?? 'default'),
  )}`;
  return defaultProfile ? svgCode : profileUrl ?? svgCode;
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function getShortAddress(address?: string | null) {
  if (!address || address.length <= 13) {
    return '';
  }
  return `${address.substr(0, 6)}...${address.substr(address.length - 6, 6)}`;
}

export const safeDataId = (dataId?: string | number | null) => {
  if (!dataId) return '';
  return dataId.toString();
};

export const getUniqueFilter = (
  iters: { [key: string]: any }[],
  key: string,
): any[] => {
  return Array.from(
    iters.reduce((map, obj) => map.set(obj[key], obj), new Map()).values(),
  );
};

export function canUseDOM(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

export const isBrowser = canUseDOM();

export const klayUnits = [
  'peb',
  'kpeb',
  'Mpeb',
  'Gpeb',
  'Ston',
  'uKLAY',
  'mKLAY',
  'KLAY',
  'kKLAY',
  'MKLAY',
  'GKLAY',
];

export function now() {
  return Math.floor(Date.now() / 1000);
}

export const placeholderDataFn = (result: any): Schema<any> => {
  return {
    ok: true,
    resultCode: 0,
    message: '',
    result,
  };
};
