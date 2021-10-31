import axios from 'axios';
import { client } from './client';

// common
import { STORAGE_KEY } from '@constants/constant';
import { API_HOST, SITE_URL } from '@constants/env';

// types
import type { Schema, Options, Params } from 'types/story-api';

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

  async getMockResponse(url: string) {
    const result = await axios(url, {
      baseURL: SITE_URL + '/api',
    });
    return result;
  }
}

export const api = new APIMoudle();
