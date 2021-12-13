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

export interface ListSchema<Result = any> {
  list: Array<Result>;
  total: number;
  pageNo: number;
}

export type DataIdParams = number | string | null | undefined;

export type StoryApi<Result = any> = AxiosResponse<Schema<Result>>;

export type StoryListApi<Result = any> = AxiosResponse<
  Schema<ListSchema<Result>>
>;

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
  profile: ProfileModel;
  account: AccountModel;
}

export interface AccountModel {
  address: string;
}

export interface ProfileModel {
  nickname: string;
  profileUrl?: string | null;
  avatarSvg: string;
  defaultProfile: boolean;
  gender: GenderType;
  bio?: string | null;
}

export interface TagModel {
  id: number;
  name: string;
}

// ================== User  ================== //

export interface ProfileInput {
  nickname?: string;
  defaultProfile?: boolean;
  avatarSvg?: string;
  profileUrl?: string;
  bio?: string;
  gender?: GenderType;
}

// ================== Login ================== //

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginSchema extends UserModel {
  accessToken: string;
}

// ================== Signup ================== //

export interface SignupInput {
  nickname: string;
  email: string;
  password: string;
  gender: GenderType;
  avatarSvg: string;
  profileUrl?: string | null;
}

// =================== Story =================== //

export interface PublishInput {
  name: string;
  tags: string[];
  description: string;
  mediaId: number;
  isPrivate?: boolean;
  backgroundColor?: string | null;
  externalUrl?: string | null;
}

export interface StorySchema {
  id: number;
  name: string;
  description: string;
  backgroundColor?: string;
  externalUrl?: string;
  createdAt: string;
  updatedAt: string;
  media: MediaModel;
  user: UserModel;
  owner: UserModel;
  tags: TagModel[];
}

export interface HistorySchema {
  id: number;
  status: string;
  to: UserModel;
  from: UserModel;
  createdAt: string;
  updatedAt: string;
}
