import { AxiosResponse } from 'axios';

// ================== Storage ================== //

export interface StorageUserInfo {
  id: number;
  email: string;
  nickname: string;
  profileUrl: string | null;
}

// ================== Common =================== //

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
  };
}
