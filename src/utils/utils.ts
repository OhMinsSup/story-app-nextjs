import qs from 'qs';
import axios from 'axios';
import parseByBytes from 'magic-bytes.js';
// @ts-ignore
import muxjs from 'mux.js';

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

export const getMimeInfo = async (blob: Blob | File) => {
  const buffer = await blob.arrayBuffer();
  const byteArray = new Uint8Array(buffer);
  const result = parseByBytes(byteArray);
  const guessedFile = result[0];
  if (!guessedFile) return null;
  if (!guessedFile.mime) return null;
  return guessedFile.mime;
};

export const getContentType = async (url: string) => {
  const response = await fetch(url);
  if (!response.body) return null;
  const contentType = response.headers.get('content-type');
  const blob = await response.blob();
  if (!contentType) {
    return await getMimeInfo(blob); // content type fullback
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

type Track = {
  codec: string;
  id: number;
  timescale: number;
  type: string;
};

export const getCodecInfo = async (file: File) => {
  const buffer = await file.arrayBuffer();
  // buffer to byte array
  const byteArray = new Uint8Array(buffer);
  const tracks = muxjs.mp4.probe.tracks(byteArray) as Track[];
  const codecs = tracks
    .filter((t) => ['video', 'audio'].includes(t.type))
    .map((t) => t.codec);
  // 'video/mp4; codecs="avc1.4d400c,mp4a.40.2,mp4a.40.2"'
  // https://videojs.com/html5-video-support/
  // https://support.kinomap.com/hc/en-us/articles/360032372652-Video-format-is-not-supported-on-your-browser-operating-system
  const mime = `${file.type}; codecs="${codecs.join(',')}"`;
  return {
    mime,
    codecs,
    tracks,
  };
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
