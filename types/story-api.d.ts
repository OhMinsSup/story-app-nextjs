import { AxiosResponse } from 'axios';

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
  id: number;
  name: string;
  path: string;
}

// ================== Common =================== //

export type GenderType = 'M' | 'F';

export interface ResponseModel<Payload = any> {
  ok: boolean;
  resultCode: number;
  message: string | null;
  payload: Payload;
}

export type StoryApi<StoryReturnPayload = any> = AxiosResponse<
  ResponseModel<StoryReturnPayload>
>;

// ================== Login ================== //

export interface MutationLoginInput {
  walletAddress: string;
  signature: string[] | string;
  timestamp: number;
}

export interface MutationLoginResponse {
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

export interface WalletSignature {
  walletAddress: string;
  signatureId: number;
  signature: string;
}

// ================== Signup ================== //

export interface MutationSignupInput {
  profileUrl?: string;
  nickname: string;
  email: string;
  walletAddress: string;
  gender: GenderType;
  signature: string[] | string;
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
