// ================== Signup ================== //

import { MediaType, UploadType } from './story-api';

export interface SignupBody {
  email: string;
  username: string;
  password: string;
  profileUrl?: string | null;
}

export interface SignupByKeystoreBody extends SignupBody {
  file: File;
}

// ================== Signin ==================== //

export interface SigninBody {
  email: string;
  password: string;
}

export interface SigninByKeystoreBody {
  file: File;
  password: string;
}

// ================== Upload ==================== //

export interface FileUploadBody {
  file: File;
  uploadType: UploadType;
  mediaType: MediaType;
}
