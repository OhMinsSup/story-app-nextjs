import { useLayoutEffect } from 'react';
import create from 'zustand';
import createContext from 'zustand/context';

import type { UserModel } from '@api/schema/story-api';
import type { SetState, UseBoundStore, StoreApi } from 'zustand';

export interface Actions {
  setAuth: (userInfo: UserModel | null) => void;
}

export interface State {
  actions?: Actions;
  userInfo: UserModel | null;
}

let store: UseBoundStore<State, StoreApi<State>> | null = null;

const initialState: State = {
  actions: undefined,
  userInfo: null,
};

const zustandContext = createContext<State>();

export const ZustandProvider = zustandContext.Provider;

export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {} as State) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return create<State>((set: SetState<State>, get: SetState<State>) => {
    const actions: Actions = {
      setAuth: (userInfo: UserModel | null) =>
        set({
          userInfo,
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
