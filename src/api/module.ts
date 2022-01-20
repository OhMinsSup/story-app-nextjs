import axios from 'axios';
import omit from 'lodash-es/omit';
import { client } from './client';

// common
import { API_ENDPOINTS, STORAGE_KEY } from '@constants/constant';

// types
import type { AxiosRequestConfig } from 'axios';
import type {
  Schema,
  Options,
  Params,
  FileUploadParams,
  StoryUploadApi,
} from '@api/schema/story-api';
import { API_HOST } from '@constants/env';

class APIMoudle {
  withCredentials: boolean;
  constructor() {
    this.withCredentials = true;
  }

  setWithCredentials(withCredentials: boolean) {
    this.withCredentials = withCredentials;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  authorized = (options?: Partial<Options>) => {
    if (typeof window === 'undefined') return null;
    const authorization = localStorage.getItem(STORAGE_KEY.TOKEN_KEY);
    if (!authorization) return null;
    return authorization;
  };

  baseConfig = (config: AxiosRequestConfig | undefined) => {
    const authorization = this.authorized();
    return {
      ...(config && omit(config, ['headers'])),
      headers: {
        'Content-Type': 'application/json',
        ...([authorization, !this.withCredentials].every(Boolean) && {
          Authorization: `Bearer ${authorization}`,
        }),
        ...(config && config.headers),
      },
    };
  };

  delete = <D = any>({ url, config = {} }: Params) => {
    return client.delete<Schema<D>>(url, this.baseConfig(config));
  };

  post = <D = any>({ url, body = {}, config = {} }: Params) => {
    return client.post<Schema<D>>(url, body, this.baseConfig(config));
  };

  put = <D = any>({ url, body = {}, config = {} }: Params) => {
    return client.put<Schema<D>>(url, body, this.baseConfig(config));
  };

  get = <D = any>({ url, config = {} }: Params) => {
    return client.get<Schema<D>>(url, this.baseConfig(config));
  };

  logout = () => {
    return axios.post(
      API_ENDPOINTS.LOCAL.AUTH.LOGOUT,
      {},
      {
        baseURL: API_HOST,
      },
    );
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
}

export const api = new APIMoudle();
