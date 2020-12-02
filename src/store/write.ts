// eslint-disable-next-line import/no-extraneous-dependencies
import { writable } from 'svelte/store';

export interface WriteState {
  markdown: string;
  title: string;
  description: string;
  tags: string[];
  publish: boolean;
  isPrivate: boolean;
}

const initialState: WriteState = {
  title: '',
  markdown: '',
  description: '',
  tags: [],
  publish: false,
  isPrivate: false,
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
    changeDescription: (description: string) =>
      update((state) => ({
        ...state,
        description,
      })),
    changePrivate: (isPrivate: boolean) =>
      update((state) => ({
        ...state,
        isPrivate,
      })),
    openPublish: () =>
      update((state) => ({
        ...state,
        publish: true,
      })),
    closePublish: () =>
      update((state) => ({
        ...state,
        publish: false,
      })),
  };
}

const write = writeStore();

export default write;
