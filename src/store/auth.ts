// eslint-disable-next-line import/no-extraneous-dependencies
import { writable } from 'svelte/store';

import type { User } from './user';

import {
  sendAuthEmailAPI,
  logoutAPI,
  LocalRegisterParams,
  localEmailRegisterAPI,
  SocialRegisterParams,
  socialRegisterAPI,
} from '../api/auth';

export interface AuthState {
  // localRegister
  authLoading: boolean;
  authData:
    | (User & {
        accessToken: string;
        refreshToken: string;
      })
    | null;

  // sendEmail
  sendEmailLoading: boolean;
  registerd: boolean | null;
}

const initialState: AuthState = {
  authLoading: false,
  authData: null,
  //  sendEmail
  sendEmailLoading: false,
  registerd: null,
};

function authStore() {
  const { update, subscribe } = writable(initialState);
  return {
    subscribe,
    socialRegister: async (body: SocialRegisterParams) => {
      try {
        update((state) => ({
          ...state,
          authLoading: true,
        }));

        const response = await socialRegisterAPI(body);
        if (!response) {
          return update((state) => ({
            ...state,
            authLoading: false,
          }));
        }

        const { data } = response;
        return update((state) => ({
          ...state,
          authLoading: false,
          authData: data,
        }));
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    localRegister: async (body: LocalRegisterParams) => {
      try {
        update((state) => ({
          ...state,
          authLoading: true,
        }));

        const response = await localEmailRegisterAPI(body);
        if (!response) {
          return update((state) => ({
            ...state,
            authLoading: false,
          }));
        }

        const { data } = response;
        return update((state) => ({
          ...state,
          authLoading: false,
          authData: data,
        }));
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    logout: () => logoutAPI(),
    sendEmail: async (email: string) => {
      try {
        update((state) => ({
          ...state,
          sendEmailLoading: true,
        }));

        const response = await sendAuthEmailAPI(email);
        if (!response) {
          return update((state) => ({
            ...state,
            registerd: null,
            sendEmailLoading: false,
          }));
        }

        const { data } = response;
        return update((state) => ({
          ...state,
          registerd: data && data.registerd,
          sendEmailLoading: false,
        }));
      } catch (e) {
        console.error(e);
        update((state) => ({
          ...state,
          sendEmailLoading: false,
          registerd: null,
        }));
        throw e;
      }
    },
  };
}

const auth = authStore();

export default auth;
