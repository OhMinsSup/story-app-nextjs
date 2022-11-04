import type { Api } from './story-api';
import type { UserSchema, WalletSchema } from './user';
import type { FileSchema } from './file';
import type { ItemSchema } from './item';

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

export interface DataIdRespSchema {
  dataId: number;
}

// signup response model
export type AuthResp = Api<AuthRespSchema>;

// signin response model
export type SigninResp = Api<AuthRespSchema>;

// me response model
export type MeResp = MeRespSchema;

// file upload response model
export type UploadResp = Api<UploadRespSchema>;

// data id return response model
export type DataIdResp = Api<DataIdRespSchema>;

// item detail response model
export type ItemDetailResp = ItemSchema;
