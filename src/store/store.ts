import { useLayoutEffect } from 'react';
import create from 'zustand';
import createContext from 'zustand/context';
import { userInfo } from '@utils/utils';

import type { StorageUserInfo, WalletSignature } from 'types/story-api';
import type { GetState, SetState, UseBoundStore, StoreApi } from 'zustand';

export interface State {
  actions: {
    setNetworkVersion: (version: number | null) => void;
    setAuth: (userInfo: StorageUserInfo | null) => void;
    setWalletSignature: (walletSignature: WalletSignature | null) => void;
  };
  userInfo: StorageUserInfo | null;
  networkVersion: number | null;
  walletSignature: WalletSignature | null;
}

let store: UseBoundStore<State, StoreApi<State>> | null = null;

const initialState: State = {
  actions: {
    setNetworkVersion: () => {},
    setAuth: () => {},
    setWalletSignature: () => {},
  },
  userInfo: userInfo(),
  networkVersion: null, // kaikas network version
  walletSignature: null, // login signature data
};

const zustandContext = createContext<State>();

export const ZustandProvider = zustandContext.Provider;

export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {} as State) => {
  return create<State>((set: SetState<State>, get: SetState<State>) => {
    const actions = {
      setNetworkVersion: (version: number | null) => {
        set({
          networkVersion: version,
        });
      },
      setAuth: (userInfo: StorageUserInfo | null) => {
        set({
          userInfo,
        });
      },
      setWalletSignature: (walletSignature: WalletSignature | null) => {
        set({
          walletSignature,
        });
      },
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

  return () => store;
}
