// eslint-disable-next-line import/no-extraneous-dependencies
import { writable } from 'svelte/store';

export interface UserState {}

const initialState: UserState = {};

function userStore() {
  const { subscribe } = writable(initialState);
  return {
    subscribe,
  };
}

const user = userStore();

export default user;
