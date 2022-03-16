import axios from 'axios';
import { isEmpty, isUndefined } from '@utils/assertion';
import message from './message';

import type { AxiosError } from 'axios';

// @ts-ignore
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? // @ts-ignore
      `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type ErrorResultData = {
  resultCode: number;
  resultMessage: string;
};

type ErrorMessagePath = NestedKeyOf<typeof message>;

class ApiError extends Error {
  constructor(apiError: Record<string, string | number>, ...args: any[]) {
    super(...args);
    this.name = 'ApiError';
    if (!isEmpty(apiError)) {
      this.message = JSON.stringify(apiError);
    }

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

  static getMessage(path?: ErrorMessagePath | null) {
    if (!path) {
      return message.alert.common;
    }

    const paths = path.split(/[,[\].]+?/).filter(Boolean);
    // array paths find message object get value
    const result = paths.reduce((acc, cur) => {
      if (isEmpty(cur)) {
        return acc;
      }
      if (isUndefined(acc)) {
        return acc;
      }
      // eslint-disable-next-line @typescript-eslint/ban-types
      return acc[cur as keyof {}];
    }, message);

    if (!result) {
      return message.alert.common;
    }
    return result as unknown as string;
  }

  static toApiErrorJSON(error: string) {
    let message: ErrorResultData | null = null;
    try {
      message = error && typeof error === 'string' ? JSON.parse(error) : null;
    } catch (error) {
      message = null;
    }

    return {
      message,
    };
  }
}

export default ApiError;
