import { useLayoutEffect } from 'react';
import create, { UseStore } from 'zustand';
import createContext from 'zustand/context';

export interface State {
  networkVersion: number | null;
}

export interface Dispatch {
  setNetworkVersion: (version: number | null) => void;
}

let store: UseStore<State & Dispatch> | undefined;

const initialState: State = {
  networkVersion: null, // kaikas network version
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
