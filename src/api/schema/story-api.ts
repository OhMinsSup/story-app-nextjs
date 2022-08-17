import type { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
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

export interface FileModel {
  idx: number;
  name?: string;
  contentUrl: string;
}

export interface FileSchema {
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

export type UploadApi = AxiosResponse<Schema<FileSchema>>;

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
  config?: AxiosRequestConfig | undefined;
  options?: Options;
}

export interface Schema<Result = any> {
  resultCode: number;
  message: string[] | string | null;
  error: string | null;
  result: Result | null;
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

export type Api<Result = any> = AxiosResponse<Schema<Result>>;

export type ListApi<Result = any> = AxiosResponse<Schema<ListSchema<Result>>>;

export type ErrorApi<Result = any> = AxiosError<Schema<Result>>;

export type DataIdApi = AxiosResponse<Schema<DataIdSchema>>;

// ================== Model =================== //

export interface MediaSchema {
  id: number;
  contentUrl: string;
  publidId: string;
  version: string;
  type: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserSchema {
  id: number;
  email: string;
  profile: ProfileSchema;
  account: AccountSchema;
}

export interface AccountSchema {
  address: string;
}

export interface ProfileSchema {
  nickname: string;
  profileUrl?: string | null;
  avatarSvg: string;
  defaultProfile: boolean;
  canNotification: boolean;
  gender: GenderType;
  bio?: string | null;
}

export interface TagSchema {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeviceSchema {
  id: number;
  os: string;
  token: string | null;
  userId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface HistorySchema {
  id: number;
  status: string;
  blockNumber: string;
  blockHash: string;
  transactionHash: string;
  createdAt: string;
}

export interface OfferSchema {
  id: number;
  buyer: {
    profile: Pick<
      ProfileSchema,
      'nickname' | 'avatarSvg' | 'defaultProfile' | 'profileUrl'
    >;
  };
  seller: {
    profile: Pick<
      ProfileSchema,
      'nickname' | 'avatarSvg' | 'defaultProfile' | 'profileUrl'
    >;
  };
  price: string;
  unit: string;
}

// ================== User  ================== //

export interface ProfileInput {
  nickname?: string;
  defaultProfile?: boolean;
  avatarSvg?: string;
  profileUrl?: string;
  bio?: string;
  gender?: GenderType;
  canNotification?: boolean;
}

// ================== Login ================== //

export interface LoginSchema {
  accessToken: string;
}

// ================== Signup ================== //

export interface SignupInput {
  nickname: string;
  email: string;
  password: string;
  avatarSvg: string;
  defaultProfile: boolean;
  gender: GenderType;
  profileUrl?: string | null;
}

// =================== Story =================== //

export interface StoryInput {
  title: string;
  description: string;
  media: { idx: number; name?: string; contentUrl: string } | null;
  backgroundColor?: string;
  externalSite?: string;
  rangeDate: Date[];
  tags: string[];
  isPublic: boolean;
  price: string;
}

export interface StorySchema {
  id: number;
  name: string;
  description: string;
  backgroundColor?: string;
  salesStatus: 'waiting' | 'sale' | 'complete' | 'end';
  externalUrl?: string;
  createdAt: string;
  updatedAt: string;
  media: MediaSchema;
  likes: { userId: number }[];
  user: UserSchema;
  owner: UserSchema;
  tags: TagSchema[];
}
