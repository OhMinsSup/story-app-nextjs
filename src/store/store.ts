import { useLayoutEffect } from 'react';
import create, { StoreApi } from 'zustand';
import createContext from 'zustand/context';

// utils
import { isBrowser } from '@utils/utils';

import type { UserSchema } from '@api/schema/story-api';
import type { SetState, UseBoundStore } from 'zustand';

export interface Actions {
  setAuth: (userInfo: UserSchema | null) => void;
  setLoggedIn: (isLoggedIn: boolean) => void;
}

export interface State {
  actions?: Actions;
  userInfo: UserSchema | null;
  isLoggedIn: boolean;
}

let store: UseBoundStore<StoreApi<State>> | null = null;

const initialState: State = {
  actions: undefined,
  userInfo: null,
  isLoggedIn: false,
};

const zustandContext = createContext<StoreApi<State>>();

export const ZustandProvider = zustandContext.Provider;

export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {} as State) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return create<State>((set: SetState<State>, get: SetState<State>) => {
    const actions: Actions = {
      setAuth: (userInfo: UserSchema | null) =>
        set({
          userInfo,
        }),
      setLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
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
  if (!isBrowser) {
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

  return () => store as UseBoundStore<StoreApi<State>>;
}
