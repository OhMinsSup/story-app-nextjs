import qs from 'qs';
import axios from 'axios';
import parseByBytes from 'magic-bytes.js';

import type { MutableRefObject } from 'react';
import type { AxiosError } from 'axios';
import type { Schema } from '@api/schema/story-api';
import type { FileSchema } from '@api/schema/file';

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

const fileTypeFromStream = (blob: Blob) => {
  return new Promise<string | null>((resolve) => {
    if (blob instanceof Blob) {
      const fileReader = new FileReader();
      fileReader.onloadend = (e) => {
        if (!e.target) return resolve(null);
        const bytes = new Uint8Array(e.target.result as ArrayBuffer);
        // https://en.wikipedia.org/wiki/List_of_file_signatures.
        // https://github.com/sindresorhus/file-type
        // https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern
        // https://stackoverflow.com/questions/18299806/how-to-check-file-mime-type-with-javascript-before-upload
        const result = parseByBytes(bytes);
        const guessedFile = result[0];
        if (!guessedFile) return resolve(null);
        if (!guessedFile.mime) return resolve(null);
        resolve(guessedFile.mime);
      };
      fileReader.onerror = () => {
        return resolve(null);
      };
      fileReader.readAsArrayBuffer(blob);
    }
  });
};

export const getContentType = async (url: string) => {
  const response = await fetch(url);
  if (!response.body) return null;
  const contentType = response.headers.get('content-type');
  const blob = await response.blob();
  if (!contentType) {
    return await fileTypeFromStream(blob); // content type fullback
  }
  const file = new File([blob], url, {
    type: contentType,
  });
  return file.type;
};

export const getFileType = async (file: FileSchema): Promise<string | null> => {
  if (file.mediaType) return file.mediaType;
  const mimeType = await getContentType(file.secureUrl);
  if (!mimeType) return null;
  if (mimeType.includes('image')) return 'IMAGE';
  if (mimeType.includes('video')) return 'VIDEO';
  return null;
};

export function optimizeAnimation(callback: () => void) {
  let ticking = false;

  return () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
    }
  };
}
