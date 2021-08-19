import {
  GetServerSidePropsContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from 'next';
import axios from 'axios';
import { STORAGE_KEY } from '@constants/constant';
import { API_HOST } from '@constants/env';
import { client } from './client';

export interface Options<Data = any> {
  initialData: Data | null;
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

  async deleteResponse({
    url,
    headers = {},
    options = { context: null, initialData: null },
  }: Params) {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async postResponse({
    url,
    body = {},
    headers = {},
    options = { context: null, initialData: null },
  }: Params) {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async putResponse({
    url,
    body = {},
    headers = {},
    options = { context: null, initialData: null },
  }: Params) {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async getResponse({
    url,
    headers = {},
    options = { context: null, initialData: null },
  }: Params) {
    try {
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
    } catch (error) {
      throw error;
    }
  }

  async getMockResponse(url: string) {
    try {
      const prefixUrl = API_HOST + url;
      const result = await axios(prefixUrl);
      console.log('result');
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export const api = new APIMoudle();
