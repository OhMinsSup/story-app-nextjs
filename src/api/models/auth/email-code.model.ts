import type { User } from '../user/user.model';

export interface EmailCodeLoginModelResponse
  extends Pick<User, 'id' | 'username' | 'display_name' | 'email' | 'thumbnail' | 'short_bio'> {
  accessToken: string;
  refreshToken: string;
}

export interface EmailCodeRegisterModelResponse {
  email: string;
  registerToken: string;
}
