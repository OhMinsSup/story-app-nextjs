// hooks
import { useMutation } from '@tanstack/react-query';
import { useMethods } from 'react-use';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';

// api
import { api } from '@api/module';
import { globalClient } from '@api/client';
import { getMeApi } from '@api/queries';

// atom
import { authAtom } from '@atoms/authAtom';

// constants
import {
  API_ENDPOINTS,
  PAGE_ENDPOINTS,
  QUERIES_KEY,
} from '@constants/constant';

// types
import { ApiError } from '@libs/error';

// types
import type { ErrorApi } from '@api/schema/story-api';
import type { SigninResp } from '@api/schema/resp';
import type { SigninBody } from '@api/schema/body';

interface ErrorState {
  message: string;
  code: number;
}

const initialState: ErrorState = {
  message: '',
  code: -1,
};

function createMethods(state: ErrorState) {
  return {
    reset(): ErrorState {
      return initialState;
    },
    setErrorMessage(payload: ErrorState): ErrorState {
      const { code, message } = payload;
      return {
        ...state,
        message,
        code,
      };
    },
  };
}

export const postLoginApi = (body: SigninBody) =>
  api.post({
    url: API_ENDPOINTS.APP.AUTH.SIGNIN,
    body,
  });

export function useLoginMutation() {
  const router = useRouter();
  const setAuth = useSetAtom(authAtom);

  const [state, methods] = useMethods<
    ReturnType<typeof createMethods>,
    ErrorState
  >(createMethods, initialState);

  const resp = useMutation<SigninResp, ErrorApi, SigninBody>(postLoginApi, {
    async onSuccess(data) {
      const result = data.data?.result;
      if (result?.userId) {
        await globalClient.prefetchQuery(QUERIES_KEY.ME, getMeApi);
      }
      setAuth(true);
      router.replace(PAGE_ENDPOINTS.INDEX);
    },
    onError(error) {
      if (ApiError.isAxiosError(error)) {
        const jsonData = error.response?.data;
        const message = jsonData?.message?.toString() || '';
        const code = jsonData?.resultCode || -1;

        methods.setErrorMessage({
          code,
          message,
        });
      } else {
        // 500 에러
      }
    },
  });

  return {
    ...resp,
    get fetcher() {
      return postLoginApi;
    },
    get state() {
      return state;
    },
    get method() {
      return methods;
    },
  };
}
