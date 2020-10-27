import client from './client';
import type { User } from '../store/user';

export type UserProfileResponse = {
  user: User;
};

export const getCurrentUserProfileAPI = () => client.get<UserProfileResponse>('/user/');

export const test = () => {};
