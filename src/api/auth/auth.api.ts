import client from '../api.client';
import { CodeLoginResponse, SendAuthEmailResponse } from './auth.dto';

/**
 * Send Auth Email
 * @param {string} email 이메일 발송을 위한 값
 */
export const sendAuthEmail = (email: string) =>
  client.post<SendAuthEmailResponse>('/auth/sendmail', {
    email,
  });

/**
 * Code Login
 * @param {string} code 코드 인증을 위한 값
 */
export const codeLogin = (code: string) =>
  client.get<CodeLoginResponse>(`/auth/code/${code}`);
