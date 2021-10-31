import { useLayoutEffect } from 'react';
import create from 'zustand';
import createContext from 'zustand/context';
import { userInfo } from '@utils/utils';

import type { StorageUserInfo } from 'types/story-api';
import type { SetState, UseBoundStore, StoreApi } from 'zustand';

export interface Actions {
  setNetworkVersion: (version: number | null) => void;
  setAuth: (userInfo: StorageUserInfo | null) => void;
  setTokenNAddress: ({
    signatureToken,
    walletAddress,
  }: {
    signatureToken: string;
    walletAddress: string;
  }) => void;
  setInstallKaiKas: (show: boolean) => void;
  setSignatureLogin: (show: boolean) => void;
  setSignup: (show: boolean) => void;
  setIsKeystoreLogin: (isKeystoreLogin: boolean) => void;
}

export interface State {
  actions?: Actions;
  userInfo: StorageUserInfo | null;
  networkVersion: number | null;

  // auth
  signatureToken: string;
  walletAddress: string;

  kaikasSignature: boolean;
  installedKaikas: boolean;
  isSignup: boolean;
  isKeystoreLogin: boolean;
}

let store: UseBoundStore<State, StoreApi<State>> | null = null;

const initialState: State = {
  actions: undefined,
  userInfo: userInfo(),
  networkVersion: null, // kaikas network version

  // login
  walletAddress: '',
  signatureToken: '', // login signature data

  kaikasSignature: false, // kaikas signature 서명을 받을 때까지 로딩
  installedKaikas: false, // kaikas가 설치되었는지
  isSignup: false, // 회원가입 시도 중
  isKeystoreLogin: false, // keystore 로그인 중
};

const zustandContext = createContext<State>();

export const ZustandProvider = zustandContext.Provider;

export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {} as State) => {
  return create<State>((set: SetState<State>, get: SetState<State>) => {
    const actions: Actions = {
      setNetworkVersion: (version: number | null) =>
        set({
          networkVersion: version,
        }),
      setAuth: (userInfo: StorageUserInfo | null) =>
        set({
          userInfo,
        }),
      setTokenNAddress: ({ signatureToken, walletAddress }) =>
        set({
          walletAddress,
          signatureToken,
        }),
      // 설치 kaikas 설치 이동
      setInstallKaiKas: (show: boolean) =>
        set({
          installedKaikas: show,
        }),
      // 서명 정보 받기
      setSignatureLogin: (show: boolean) =>
        set({
          kaikasSignature: show,
        }),
      // 회원가입 시도 중
      setSignup: (show: boolean) =>
        set({
          isSignup: show,
        }),
      // keystore 로그인 중
      setIsKeystoreLogin: (isKeystoreLogin: boolean) =>
        set({
          isKeystoreLogin,
        }),
    };
    return {
      ...initialState,
      ...preloadedState,
      actions,
    };
  });
};

export function useCreateStore(initialState: State) {
  // For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(initialState);
  }

  // For CSR, always re-use same store.
  store = store ?? initializeStore(initialState);
  // And if initialState changes, then merge states in the next render cycle.
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    if (initialState && store) {
      store.setState({
        ...store.getState(),
        ...initialState,
      });
    }
  }, [initialState]);

  return () => store as UseBoundStore<State, StoreApi<State>>;
}
