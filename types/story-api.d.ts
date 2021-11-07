import type { AxiosResponse, AxiosError } from 'axios';
import type {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from 'next';
import { GenderEnum, StoryUploadTypeEnum } from './enum';

// ================= Enum Type Declarations ================= //

export type GenderType = keyof typeof GenderEnum;

export type StoryUploadType =
  | StoryUploadTypeEnum.STORY
  | StoryUploadTypeEnum.ETC
  | StoryUploadTypeEnum.PROFILE;

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

interface FileSchema {
  id: number;
  name: string;
  fileType: string;
  storyType: string;
  path: string;
}

export interface FileUploadParams {
  storyType: StoryUploadType;
  file: File;
}

export type StoryUploadApi = AxiosResponse<Schema<FileSchema>>;

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

export interface DataIdSchema {
  dataId: number;
}

export type DataIdParams = number | string | null | undefined;

export type StoryApi<Result = any> = AxiosResponse<Schema<Result>>;

export type StoryErrorApi<Result = any> = AxiosError<Schema<Result>>;

export type StoryDataIdApi = AxiosResponse<Schema<DataIdSchema>>;

// ================== Model =================== //

export interface MediaModel {
  id: number;
  contentUrl: string;
  originUrl: string;
  type: StoryUploadType;
}

export interface UserModel {
  id: number;
  email: string;
  address: string;
  profile: ProfileModel;
}

export interface ProfileModel {
  nickname: string;
  profileUrl?: string | null;
  avatarSvg: string;
  defaultProfile: boolean;
  gender: GenderType;
}

export interface TagModel {
  id: number;
  name: string;
}

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

export interface MutationSignupInput {
  profileUrl?: string;
  nickname: string;
  email: string;
  gender: GenderType;
  walletAddress: string;
  signatureToken: string;
}

// =================== Story =================== //

export interface MutationStoriesInput {
  name: string;
  tags: string[];
  description: string;
  mediaId: number;
  isPrivate?: boolean;
  backgroundColor?: string | null;
  externalUrl?: string | null;
}

export interface StorySchema {
  name: string;
  description: string;
  backgroundColor?: string;
  externalUrl?: string;
  createdAt: string;
  updatedAt: string;
  media: MediaModel;
  user: UserModel;
  tags: TagModel[];
}
