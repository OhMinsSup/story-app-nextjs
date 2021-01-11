import client from './client';
import type { GetPostModelResponse } from './models/post/get-post.model';

// eslint-disable-next-line import/prefer-default-export
export const getPostAPI = (postId: string) => client.get<GetPostModelResponse>(`/post/${postId}`);
