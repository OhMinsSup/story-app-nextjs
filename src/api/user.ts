import client from './client';
import type { User } from './models/user/user.model';

export type UserProfileResponse = {
  user: User;
};

export const getCurrentUserProfileAPI = () => client.get<UserProfileResponse>('/user/');

export const test = () => {};
