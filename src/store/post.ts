// eslint-disable-next-line import/no-extraneous-dependencies
import { writable } from 'svelte/store';
import type { Post } from '../api/models/post/post.model';
import { getPostAPI } from '../api/post';

export interface PostState {
  postLoading: boolean;
  postInfo: Post | null;
  commentCount: number;
}

const initialState: PostState = {
  postLoading: false,
  postInfo: null,
  commentCount: 0,
};

function postState() {
  const { subscribe, update } = writable(initialState);
  return {
    subscribe,
    getPost: async (postId: string) => {
      try {
        update((state) => ({
          ...state,
          postLoading: true,
        }));

        const response = await getPostAPI(postId);
        if (!response.data.post) {
          update((state) => ({
            ...state,
            postLoading: false,
          }));
          return;
        }

        const { data } = response;
        update((state) => ({
          ...state,
          postLoading: false,
          postInfo: data.post,
          commentCount: data.comment_count,
        }));
        return;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  };
}

const post = postState();

export default post;
