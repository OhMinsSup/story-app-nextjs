import { useLayoutEffect } from 'react';
import create, { UseStore } from 'zustand';
import createContext from 'zustand/context';
import { userInfo } from '@utils/utils';
import { StorageUserInfo, WalletSignature } from 'types/story-api';

export interface State {
  userInfo: StorageUserInfo | null;
  networkVersion: number | null;
  walletSignature: WalletSignature | null;
}

export interface Dispatch {
  setNetworkVersion: (version: number | null) => void;
  setAuth: (userInfo: StorageUserInfo | null) => void;
  setWalletSignature: (walletSignature: WalletSignature | null) => void;
}

let store: UseStore<State & Dispatch> | undefined;

const initialState: State = {
  userInfo: userInfo(),
  networkVersion: null, // kaikas network version
  walletSignature: null, // login signature data
};

const zustandContext = createContext<State & Dispatch>();

export const ZustandProvider = zustandContext.Provider;

export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {} as State) => {
  return create<State & Dispatch>((set, get) => ({
    ...initialState,
    ...preloadedState,
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
  }));
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

  return () => store as UseStore<State & Dispatch>;
}
