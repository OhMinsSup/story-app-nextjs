// eslint-disable-next-line import/no-extraneous-dependencies
import { writable } from 'svelte/store';

type OpenPopupParams = {
  title: string;
  message: string;
};

export interface CoreAuthState {
  visible: boolean;
  mode: 'REGISTER' | 'LOGIN';
}

export interface CorePopupState {
  visible: boolean;
  title: string;
  message: string;
}

export interface CoreState {
  layer: boolean;
  auth: CoreAuthState;
  popup: CorePopupState;
}

const initialState: CoreState = {
  layer: false,
  auth: {
    visible: false,
    mode: 'LOGIN',
  },
  popup: {
    visible: false,
    title: '',
    message: '',
  },
};

function coreStore() {
  const { update, subscribe } = writable(initialState);
  return {
    subscribe,
    setLayer: (layer: boolean) => {
      return update((state) => ({
        ...state,
        layer,
      }));
    },
    changeAuthModalMode: (mode: 'REGISTER' | 'LOGIN') => {
      return update((state) => ({
        ...state,
        auth: {
          ...state.auth,
          mode,
        },
      }));
    },
    showAuthModal: (mode: 'REGISTER' | 'LOGIN') => {
      return update((state) => ({
        ...state,
        auth: {
          ...state.auth,
          mode,
          visible: true,
        },
        layer: true,
      }));
    },
    closeAuthModal: () => {
      return update((state) => ({
        ...state,
        auth: {
          ...state.auth,
          visible: false,
        },
        layer: false,
      }));
    },
    openPopup: ({ title, message }: OpenPopupParams) => {
      return update((state) => ({
        ...state,
        popup: {
          ...state.popup,
          title,
          message,
          visible: true,
        },
      }));
    },
    closePopup: () => {
      return update((state) => ({
        ...state,
        popup: {
          ...state.popup,
          visible: false,
        },
      }));
    },
  };
}

const core = coreStore();

export default core;
