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
} from '@api/schema/story-api';

class APIMoudle {
  withCredentials: boolean;
  constructor() {
    this.withCredentials = true;
  }

  setWithCredentials(withCredentials: boolean) {
    this.withCredentials = withCredentials;
  }

  authorized = (options?: Partial<Options>) => {
    if (typeof window === 'undefined') return null;
    const authorization = localStorage.getItem(STORAGE_KEY.TOKEN_KEY);
    if (!authorization) return null;
    return authorization;
  };

  delete = async <D = any>({
    url,
    headers = {},
    options = { context: null },
  }: Params) => {
    const authorization = this.authorized();
    const result = await client.delete<Schema<D>>(url, {
      headers: {
        'Content-Type': 'application/json',
        ...([authorization, !this.withCredentials].every(Boolean) && {
          Authorization: `Bearer ${authorization}`,
        }),
        ...headers,
      },
    });
    return result;
  };

  post = async <D = any>({
    url,
    body = {},
    headers = {},
    options = { context: null },
  }: Params) => {
    const authorization = this.authorized();
    const result = await client.post<Schema<D>>(url, body, {
      headers: {
        'Content-Type': 'application/json',
        ...([authorization, !this.withCredentials].every(Boolean) && {
          Authorization: `Bearer ${authorization}`,
        }),
        ...headers,
      },
    });
    return result;
  };

  put = async <D = any>({
    url,
    body = {},
    headers = {},
    options = { context: null },
  }: Params) => {
    const authorization = this.authorized();
    const result = await client.put<Schema<D>>(url, body, {
      headers: {
        'Content-Type': 'application/json',
        ...([authorization, !this.withCredentials].every(Boolean) && {
          Authorization: `Bearer ${authorization}`,
        }),
        ...headers,
      },
    });
    return result;
  };

  get = async <D = any>({
    url,
    headers = {},
    options = { context: null },
  }: Params) => {
    const authorization = this.authorized();
    const result = await client.get<Schema<D>>(url, {
      headers: {
        'Content-Type': 'application/json',
        ...([authorization, !this.withCredentials].every(Boolean) && {
          Authorization: `Bearer ${authorization}`,
        }),
        ...headers,
      },
    });
    return result;
  };

  upload = async ({ file, storyType }: FileUploadParams) => {
    const form = new FormData();
    form.append('file', file);
    form.append('storyType', storyType);
    const authorization = this.authorized();

    const result: StoryUploadApi = await client.post(
      API_ENDPOINTS.LOCAL.FILE.ROOT,
      form,
      {
        headers: {
          ...([authorization, !this.withCredentials].every(Boolean) && {
            Authorization: `Bearer ${authorization}`,
          }),
          'Content-Type': 'multipart/form-data',
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
