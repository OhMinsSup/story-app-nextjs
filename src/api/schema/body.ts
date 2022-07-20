// ================== Signup ================== //

import type { GenderType } from './story-api';

export interface SignupBody {
  nickname: string;
  email: string;
  password: string;
  avatarSvg: string;
  defaultProfile: boolean;
  gender: GenderType;
  profileUrl?: string | null;
}

export interface LoginBody {
  email: string;
  password: string;
  deviceId?: number;
}
