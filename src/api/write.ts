import client from './client';
import type { WritePostModelRequsetBody, WritePostModelResponse } from './models/write/write-post.model';

// eslint-disable-next-line import/prefer-default-export
export const writePostAPI = (body: WritePostModelRequsetBody) => client.post<WritePostModelResponse>('/post/', body);
