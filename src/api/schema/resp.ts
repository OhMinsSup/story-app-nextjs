import type { Api, MediaSchema, Schema } from './story-api';
import type { UserSchema, WalletSchema } from './user';

interface AuthRespSchema {
  userId: number;
  accessToken: string;
}

interface MeRespSchema
  extends Pick<UserSchema, 'id' | 'email' | 'username' | 'profileUrl'> {
  wallet: Pick<WalletSchema, 'id' | 'address'>;
}

// signup response model
export type AuthResp = Api<AuthRespSchema>;

// signin response model
export type SigninResp = Api<AuthRespSchema>;

// me response model
export type MeResp = MeRespSchema;

// files response model
export type FileListResp = Schema<MediaSchema[]>;
