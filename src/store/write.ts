// eslint-disable-next-line import/no-extraneous-dependencies
import { writable } from 'svelte/store';

export interface WriteState {
  markdown: string;
  title: string;
  tags: string[];
}

const initialState: WriteState = {
  title: '',
  markdown: '',
  tags: [],
};

function writeStore() {
  const { subscribe, update } = writable(initialState);
  return {
    subscribe,
    changeMarkDown: (markdown: string) =>
      update((state) => ({
        ...state,
        markdown,
      })),
    changeTitle: (title: string) =>
      update((state) => ({
        ...state,
        title,
      })),
    changeTags: (tags: string[]) =>
      update((state) => ({
        ...state,
        tags,
      })),
  };
}

const write = writeStore();

export default write;
