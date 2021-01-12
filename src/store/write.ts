// eslint-disable-next-line import/no-extraneous-dependencies
import { writable } from 'svelte/store';
import type { Post } from '../api/models/post/post.model';
import type { WritePostModelRequsetBody } from '../api/models/write/write-post.model';
import { editPostAPI, writePostAPI } from '../api/write';

export interface WriteState {
  // api calling state
  postLoading: boolean;

  markdown: string;
  title: string;
  html: string;
  tags: string[];
  publish: boolean;
  textBody: string;
  defaultDescription: string;
  description: string;
  isPrivate: boolean;
  urlSlug: string;
  thumbnail: string | null;
  postId: string | null;
  isTemp: boolean;
  initialTitle: string;
  initialBody: string;
}

const initialState: WriteState = {
  postLoading: false,

  markdown: '',
  title: '',
  html: '',
  tags: [],
  publish: false,
  textBody: '',
  defaultDescription: '',
  description: '',
  isPrivate: false,
  urlSlug: '',
  thumbnail: null,
  postId: null,
  isTemp: false,
  initialTitle: '',
  initialBody: '',
};

function writeStore() {
  const { subscribe, update } = writable(initialState);
  return {
    subscribe,
    // edit post
    editPost: async (postId: string, body: WritePostModelRequsetBody) => {
      try {
        update((state) => ({
          ...state,
          postLoading: true,
        }));

        const response = await editPostAPI(postId, body);
        if (!response) {
          update((state) => ({
            ...state,
            postLoading: false,
          }));
          return;
        }
        const { post_id } = response.data;
        update((state) => ({
          ...state,
          postId: post_id,
          postLoading: false,
        }));
      } catch (e) {
        console.error(e);
      }
    },
    // write post
    writePost: async (body: WritePostModelRequsetBody) => {
      try {
        update((state) => ({
          ...state,
          postLoading: true,
        }));

        const response = await writePostAPI(body);
        if (!response) {
          update((state) => ({
            ...state,
            postLoading: false,
          }));
          return;
        }

        const { post_id } = response.data;
        update((state) => ({
          ...state,
          postId: post_id,
          postLoading: false,
        }));
      } catch (e) {
        console.error(e);
      }
    },
    // get post data initial binding
    setInitialPost: (postData: Post) =>
      update((state) => ({
        ...state,
        postId: postData.id,
        tags: postData.tags,
        markdown: postData.body,
        initialBody: postData.body,
        initialTitle: postData.title,
        thumbnail: postData.thumbnail,
        isPrivate: postData.is_private,
        isTemp: postData.is_temp,
      })),
    // change markdown
    changeMarkDown: (markdown: string) =>
      update((state) => ({
        ...state,
        markdown,
      })),
    // change title
    changeTitle: (title: string) =>
      update((state) => ({
        ...state,
        title,
      })),
    // change url slug
    changeUrlSlug: (urlSlug: string) =>
      update((state) => ({
        ...state,
        urlSlug,
      })),
    // change tags
    changeTags: (tags: string[]) =>
      update((state) => ({
        ...state,
        tags,
      })),
    // change description
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
    // clear editor post data
    clearEditor: () => update(() => initialState),
    // set html
    setHtml: (html: string) =>
      update((state) => ({
        ...state,
        html,
      })),
    // set text body
    setTextBody: (textBody: string) =>
      update((state) => ({
        ...state,
        textBody,
      })),
    // set default description
    setDefaultDescription: (defaultDescription: string) =>
      update((state) => ({
        ...state,
        defaultDescription,
      })),
    // set privacy
    setPrivacy: (isPrivate: boolean) =>
      update((state) => ({
        ...state,
        isPrivate,
      })),
    // set post thumbnail
    setPostThumbnail: (thumbnail: string | null) =>
      update((state) => ({
        ...state,
        thumbnail,
      })),
    // set post Id
    setPostId: (postId: string | null) =>
      update((state) => ({
        ...state,
        postId,
        isTemp: false,
      })),
    // initalbody
    setInitialBody: (body: string) =>
      update((state) => ({
        ...state,
        initialBody: body,
      })),
    // initalTitle
    setInitialTitle: (title: string) =>
      update((state) => ({
        ...state,
        title,
        initialTitle: title,
      })),
  };
}

const write = writeStore();

export default write;
