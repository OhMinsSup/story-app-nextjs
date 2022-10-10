import type { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import type {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from 'next';

export interface Options {
  context:
    | GetStaticPropsContext
    | GetServerSidePropsContext
    | GetStaticPathsContext
    | null;
}

export interface Params<Body = any> {
  url: string;
  body?: Body;
  config?: AxiosRequestConfig | undefined;
  options?: Options;
}

export interface Schema<Result = any> {
  resultCode: number;
  message: string[] | string | null;
  error: string | null;
  result: Result | null;
}

export interface ListSchema<Result = any> {
  list: Array<Result>;
  total: number;
  pageNo: number;
}

export type Api<Result = any> = AxiosResponse<Schema<Result>>;

export type ListApi<Result = any> = AxiosResponse<Schema<ListSchema<Result>>>;

export type ErrorApi<Result = any> = AxiosError<Schema<Result>>;

// ================== Common =================== //

export const MEDIA_TYPE = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  MODEL: 'MODEL',
  THUMBNAIL: 'THUMBNAIL',
} as const;

export type MediaType = keyof typeof MEDIA_TYPE;

export const UPLOAD_TYPE = {
  PROFILE: 'PROFILE',
  NFT: 'NFT',
  THUMBNAIL: 'THUMBNAIL',
} as const;

export type UploadType = keyof typeof UPLOAD_TYPE;
