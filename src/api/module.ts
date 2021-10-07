import {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from 'next';
import axios from 'axios';
import { API_ENDPOINTS, STORAGE_KEY } from '@constants/constant';
import { API_HOST } from '@constants/env';
import { client } from './client';

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

  deleteResponse = async ({
    url,
    headers = {},
    options = { context: null },
  }: Params) => {
    const authorization = this.authorized();
    const result = await client.delete(url, {
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

  postResponse = async ({
    url,
    body = {},
    headers = {},
    options = { context: null },
  }: Params) => {
    const authorization = this.authorized();
    const result = await client.post(url, body, {
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

  putResponse = async ({
    url,
    body = {},
    headers = {},
    options = { context: null },
  }: Params) => {
    const authorization = this.authorized();
    const result = await client.put(url, body, {
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

  getResponse = async ({
    url,
    headers = {},
    options = { context: null },
  }: Params) => {
    const authorization = this.authorized();
    const result = await client.get(url, {
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

  uploadResponse = async (body: {
    dataUrl: string;
    storeType: string;
    name: string;
  }) => {
    // 파일 업로드
    const authorization = this.authorized();
    const finalize = await client.post<any>(
      API_ENDPOINTS.LOCAL.FILE.ROOT,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(authorization && {
            Authorization: `Bearer ${authorization}`,
          }),
        },
      },
    );

    return finalize;
  };
}

export const api = new APIMoudle();
