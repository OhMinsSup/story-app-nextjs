import type { Api, LoginSchema, MediaSchema, Schema } from './story-api';

// signup response model
export type SignupResp = Api<string | boolean>;

// signin response model
export type SigninResp = Api<LoginSchema>;

// files response model
export type FileListResp = Schema<MediaSchema[]>;
