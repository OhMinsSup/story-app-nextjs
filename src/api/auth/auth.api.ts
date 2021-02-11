import client from '../api.client';
import { SendAuthEmailResponse } from './auth.dto';

/**
 * Send Auth Email
 * docs: https://documenter.getpostman.com/view/723994/S11RJuhq#7933badc-b964-4b84-88ff-4119134925a8
 * @param email
 */
export const sendAuthEmail = (email: string) =>
  client.post<SendAuthEmailResponse>('/api/v1.0/auth/sendmail', {
    email,
  });
