import client from './client';
import type { WritePostModelRequsetBody, WritePostModelResponse } from './models/write/write-post.model';

export const writePostAPI = (body: WritePostModelRequsetBody) => client.post<WritePostModelResponse>('/post/', body);

export const editPostAPI = (postId: string, body: WritePostModelRequsetBody) =>
  client.put<WritePostModelResponse>(`/post/${postId}`, body);
