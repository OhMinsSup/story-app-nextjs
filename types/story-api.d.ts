import type { AxiosResponse, AxiosError } from 'axios';
import type {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from 'next';
import { GenderEnum, StoryUploadTypeEnum } from './enum';

// ================== Storage ================== //

export interface StorageUserInfo {
  id: number;
  email: string;
  profile: {
    nickname: string;
    profileUrl: string | null;
    avatarSvg: string | null;
    defaultProfile: boolean;
  };
}

// ================== File ================== //

interface FileModel {
  idx: number;
  name?: string;
  contentUrl: string;
}

export interface FileUploadParams {
  storyType:
    | StoryUploadTypeEnum.STORY
    | StoryUploadTypeEnum.ETC
    | StoryUploadTypeEnum.PROFILE;
  file: File;
}

export type StoryUploadApi = AxiosResponse<
  Schema<{
    id: number;
    name: string;
    fileType: string;
    storyType: string;
    path: string;
  }>
>;

// ================== Common =================== //

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
  headers?: Record<string, string>;
  options?: Options;
}

export interface Schema<Result = any> {
  ok: boolean;
  resultCode: number;
  message: string | null;
  result: Result;
}

export type StoryApi<Result = any> = AxiosResponse<Schema<Result>>;

export type StoryErrorApi<Result = any> = AxiosError<Schema<Result>>;

// ================== Login ================== //

export interface MutationLoginInput {
  walletAddress: string;
  signature: string;
}

export type LoginSchema = {
  id: number;
  email: string;
  accessToken: string;
  profile: {
    nickname: string;
    profileUrl: string | null;
    avatarSvg: string | null;
    defaultProfile: boolean;
  };
};

// ================== Signup ================== //

export type GenderType = keyof typeof GenderEnum;

export interface MutationSignupInput {
  profileUrl?: string;
  nickname: string;
  email: string;
  gender: GenderType;
  walletAddress: string;
  signatureToken: string;
}

export interface MutationSignupResponse {
  id: number;
  email: string;
  accessToken: string;
  profile: {
    nickname: string;
    profileUrl: string | null;
    avatarSvg: string | null;
    defaultProfile: boolean;
  };
}
