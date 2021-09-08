import { AxiosError } from 'axios';
import multiavatar from '@multiavatar/multiavatar/esm';
import { STORAGE_KEY } from '@constants/constant';

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

export function isAxiosError(error: AxiosError) {
  return !!error.response;
}

export const generateAvatar = () => {
  const svgCode = multiavatar(Math.random().toString(36).substr(2, 11));
  return svgCode;
};
