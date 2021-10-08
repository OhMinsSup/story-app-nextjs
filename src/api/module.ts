import axios from 'axios';
import { client } from './client';

// common
import { STORAGE_KEY } from '@constants/constant';
import { API_HOST } from '@constants/env';

// types
import type { ResponseModel } from 'types/story-api';
import type {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from 'next';

export interface Options {
  context:
    | GetStaticPropsContext
    | GetServerSidePropsContext
    | GetStaticPathsContext
    | null;
}

export type Header = { [key: string]: string };

export interface Params<Body = any> {
  url: string;
  body?: Body;
  headers?: Header;
  options?: Options;
}

class APIMoudle {
  authorized(options?: Partial<Options>) {
    const authorization = localStorage.getItem(STORAGE_KEY.TOKEN_KEY);
    if (!authorization) return null;
    return authorization;
  }

  deleteResponse = async <D = any>({
    url,
    headers = {},
    options = { context: null },
  }: Params) => {
    const authorization = this.authorized();
    const result = await client.delete<ResponseModel<D>>(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(authorization && {
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
    const result = await client.post<ResponseModel<D>>(url, body, {
      headers: {
        'Content-Type': 'application/json',
        ...(authorization && {
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
    const result = await client.put<ResponseModel<D>>(url, body, {
      headers: {
        'Content-Type': 'application/json',
        ...(authorization && {
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
    const result = await client.get<ResponseModel<D>>(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(authorization && {
          Authorization: `Bearer ${authorization}`,
        }),
        ...headers,
      },
    });
    return result;
  };

  async getMockResponse(url: string) {
    const prefixUrl = API_HOST + url;
    const result = await axios(prefixUrl);
    return result;
  }
}

export const api = new APIMoudle();
