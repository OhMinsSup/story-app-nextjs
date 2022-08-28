import type { Api } from './story-api';
import type { UserSchema, WalletSchema } from './user';
import type { FileSchema } from './file';

export interface AuthRespSchema {
  userId: number;
  accessToken: string;
}

export interface MeRespSchema
  extends Pick<UserSchema, 'id' | 'email' | 'username' | 'profileUrl'> {
  wallet: Pick<WalletSchema, 'id' | 'address'>;
}

export interface UploadRespSchema
  extends Pick<FileSchema, 'id' | 'publicId' | 'mediaType' | 'secureUrl'> {}

// signup response model
export type AuthResp = Api<AuthRespSchema>;

// signin response model
export type SigninResp = Api<AuthRespSchema>;

// me response model
export type MeResp = MeRespSchema;

// file upload response model
export type UploadResp = Api<UploadRespSchema>;
