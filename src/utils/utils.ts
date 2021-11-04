import { STORAGE_KEY } from '@constants/constant';

import type { AxiosError } from 'axios';
import type { Schema } from 'types/story-api';

const multiavatar = require('@multiavatar/multiavatar');

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

// valid klaytn and kaikas
export const existsKlaytn =
  typeof window === 'undefined' ||
  typeof window.klaytn === 'undefined' ||
  !window.klaytn.isKaikas;

// make signature from message
export const signatureMessage = (
  walletAddress: string,
  timestamp: number,
  requestType: string,
) => {
  return `address:${walletAddress}\n timestamp:${timestamp} ${requestType}`;
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

export const generateAvatar = (key: string) => {
  const svgCode = multiavatar(key);
  return svgCode;
};

export const getUserThumbnail = ({
  defaultProfile,
  avatarSvg,
  profileUrl,
  nickname,
}: {
  defaultProfile: boolean;
  avatarSvg: string | null;
  profileUrl: string | null;
  nickname: string;
}) => {
  const svgCode = `data:image/svg+xml;utf8,${encodeURIComponent(
    generateAvatar(avatarSvg ?? nickname),
  )}`;
  return defaultProfile ? svgCode : profileUrl ?? svgCode;
};
