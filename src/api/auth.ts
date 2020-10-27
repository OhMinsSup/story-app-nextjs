import client from './client';
import type { User } from '../store/user';
import { VELOG_USER_KEY } from '../config/contants';

type SendAuthEmailResponse = {
  registerd: boolean;
};

type AuthResponse = User & {
  accessToken: string;
  refreshToken: string;
};

type CodeRegisterResponse = {
  email: string;
  registerToken: string;
};

export type SocialRegisterParams = {
  displayName: string;
  username: string;
  shortBio: string;
};

export type LocalRegisterParams = {
  registerToken: string;
} & SocialRegisterParams;

export const getRegisterTokenAPI = (code: string) => client.get<CodeRegisterResponse>(`/auth/code/${code}`);

export const getSocialProfileAPI = () => client.get('/auth/social/profile');

export const emailCodeLoginAPI = (code: string) => client.get<AuthResponse>(`/auth/code/${code}`);

export const socialRegisterAPI = ({ displayName, username, shortBio }: SocialRegisterParams) =>
  client.post<AuthResponse>('/auth/social/register', {
    display_name: displayName,
    short_bio: shortBio,
    username,
  });

export const localEmailRegisterAPI = ({ registerToken, displayName, username, shortBio }: LocalRegisterParams) =>
  client.post<AuthResponse>('/auth/register/local', {
    register_token: registerToken,
    display_name: displayName,
    short_bio: shortBio,
    username,
  });

export const logoutAPI = () => client.post('/auth/logout').then(() => localStorage.removeItem(VELOG_USER_KEY));

export const sendAuthEmailAPI = (email: string) =>
  client.post<SendAuthEmailResponse>('/auth/sendmail', {
    email,
  });
