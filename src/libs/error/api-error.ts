import axios from 'axios';

import type { AxiosError } from 'axios';
import type { Schema } from '@api/schema/story-api';

interface ErrorResultData<S = any> extends Schema<S> {}

class ApiError extends Error {
  private _data: any = null;
  constructor(message: string, data: any, ...args: any[]) {
    super(...args);
    this.name = 'ApiError';
    this.message = message;
    this._data = data;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  static isAxiosError(error: any): error is AxiosError<any> {
    return axios.isAxiosError(error);
  }

  static isApiError(error: any): error is ApiError {
    return error instanceof ApiError;
  }

  toApiErrorJSON<Data = any>() {
    let message: ErrorResultData<Data> | null = null;
    try {
      message =
        this._data && typeof this._data === 'string'
          ? JSON.parse(this._data)
          : null;
    } catch (error) {
      message = null;
    }

    return {
      message,
    };
  }
}

export default ApiError;
