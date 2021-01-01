import type { User } from '../user/user.model';

export interface AuthModelResponse
  extends Pick<User, 'id' | 'username' | 'display_name' | 'email' | 'thumbnail' | 'short_bio'> {
  accessToken: string;
  refreshToken: string;
}
