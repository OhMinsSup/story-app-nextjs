import { STORAGE_KEY } from '@constants/constant';
import qs from 'qs';

import type { MutableRefObject } from 'react';
import type { AxiosError } from 'axios';
import type { Schema } from 'types/story-api';
import { COLORS } from '@libs/colors/constants';

const multiavatar = require('@multiavatar/multiavatar');

export type BasicTarget<T = HTMLElement> =
  | (() => T | null)
  | T
  | null
  | MutableRefObject<T | null | undefined>;

type TargetElement = HTMLElement | Element | Document | Window;

export const makeQueryString = (params: any) => {
  const stringify = qs.stringify(params, {
    arrayFormat: 'comma',
    skipNulls: true,
    addQueryPrefix: true,
  });
  return stringify;
};

export function getTargetElement(
  target?: BasicTarget<TargetElement>,
  defaultElement?: TargetElement,
): TargetElement | undefined | null {
  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetElement | undefined | null;

  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}

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
  return error && error.isAxiosError && error.response;
}

export const generateKey = () => {
  return Math.random().toString(36).substr(2, 11);
};

export const blurDataUrl = (w: string | number, h: string | number) => {
  const shimmer = (w: string | number, h: string | number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <!-- stop stop-color="#333" offset="20%" / -->
        <!-- stop stop-color="#222" offset="50%" / -->
        <!-- stop stop-color="#333" offset="70%" / -->
        <stop stop-color="${COLORS.gray['gray-1']}" offset="20%" />
        <stop stop-color="${COLORS.gray['gray-0']}" offset="50%" />
        <stop stop-color="${COLORS.gray['gray-1']}" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="${COLORS.gray['gray-1']}" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
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
