import axios from 'axios';
import { client } from './client';

// common
import { API_ENDPOINTS, STORAGE_KEY } from '@constants/constant';
import { SITE_URL } from '@constants/env';

// types
import type {
  Schema,
  Options,
  Params,
  FileUploadParams,
  StoryUploadApi,
} from 'types/story-api';

class APIMoudle {
  withCredentials: boolean;
  constructor() {
    this.withCredentials = true;
  }

  setWithCredentials(withCredentials: boolean) {
    this.withCredentials = withCredentials;
  }

  authorized = (options?: Partial<Options>) => {
    const authorization = localStorage.getItem(STORAGE_KEY.TOKEN_KEY);
    if (!authorization) return null;
    return authorization;
  };

  deleteResponse = async <D = any>({
    url,
    headers = {},
    options = { context: null },
  }: Params) => {
    const authorization = this.authorized();
    const result = await client.delete<Schema<D>>(url, {
      headers: {
        'Content-Type': 'application/json',
        ...([authorization, !this.withCredentials] && {
          Authorization: `Bearer ${authorization}`,
        }),
        ...headers,
      },
    });
    return result;
  };

  postResponse = async <D = any>({
    url,
    body = {},
    headers = {},
    options = { context: null },
  }: Params) => {
    const authorization = this.authorized();
    const result = await client.post<Schema<D>>(url, body, {
      headers: {
        'Content-Type': 'application/json',
        ...([authorization, !this.withCredentials] && {
          Authorization: `Bearer ${authorization}`,
        }),
        ...headers,
      },
    });
    return result;
  };

  putResponse = async <D = any>({
    url,
    body = {},
    headers = {},
    options = { context: null },
  }: Params) => {
    const authorization = this.authorized();
    const result = await client.put<Schema<D>>(url, body, {
      headers: {
        'Content-Type': 'application/json',
        ...([authorization, !this.withCredentials] && {
          Authorization: `Bearer ${authorization}`,
        }),
        ...headers,
      },
    });
    return result;
  };

  getResponse = async <D = any>({
    url,
    headers = {},
    options = { context: null },
  }: Params) => {
    const authorization = this.authorized();
    const result = await client.get<Schema<D>>(url, {
      headers: {
        'Content-Type': 'application/json',
        ...([authorization, !this.withCredentials] && {
          Authorization: `Bearer ${authorization}`,
        }),
        ...headers,
      },
    });
    return result;
  };

  uploadResponse = async ({ file, storyType }: FileUploadParams) => {
    const form = new FormData();
    form.append('file', file);
    form.append('storyType', storyType);
    const authorization = this.authorized();

    const result: StoryUploadApi = await client.post(
      API_ENDPOINTS.LOCAL.FILE.ROOT,
      form,
      {
        headers: {
          ...([authorization, !this.withCredentials] && {
            Authorization: `Bearer ${authorization}`,
          }),
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded * 100) / total);
          console.log(percent);
        },
      },
    );
    return result;
  };

  async getMockResponse(url: string) {
    const result = await axios(url, {
      baseURL: SITE_URL + '/api',
    });
    return result;
  }
}

export const api = new APIMoudle();
