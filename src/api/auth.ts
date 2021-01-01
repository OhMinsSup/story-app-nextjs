import client from './client';
import type { SendAuthEmailModelResponse } from './models/auth/send-auth-email.model';
import type { EmailCodeLoginModelResponse, EmailCodeRegisterModelResponse } from './models/auth/email-code.model';
import type { AuthModelResponse } from './models/auth/commom.model';

export type SocialRegisterParams = {
  displayName: string;
  username: string;
  shortBio: string;
};

export type LocalRegisterParams = {
  registerToken: string;
} & SocialRegisterParams;

export const getSocialProfileAPI = () => client.get('/auth/social/profile');

export const logoutAPI = () => client.post('/auth/logout');

export const getRegisterTokenAPI = (code: string) => client.get<EmailCodeRegisterModelResponse>(`/auth/code/${code}`);

export const emailCodeLoginAPI = (code: string) => client.get<EmailCodeLoginModelResponse>(`/auth/code/${code}`);

export const sendAuthEmailAPI = (email: string) =>
  client.post<SendAuthEmailModelResponse>('/auth/sendmail', {
    email,
  });

export const socialRegisterAPI = ({ displayName, username, shortBio }: SocialRegisterParams) =>
  client.post<AuthModelResponse>('/auth/social/register', {
    display_name: displayName,
    short_bio: shortBio,
    username,
  });

export const localEmailRegisterAPI = ({ registerToken, displayName, username, shortBio }: LocalRegisterParams) =>
  client.post<AuthModelResponse>('/auth/register/local', {
    register_token: registerToken,
    display_name: displayName,
    short_bio: shortBio,
    username,
  });
