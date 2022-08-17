// hooks
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMethods } from 'react-use';
import { useSetAtom } from 'jotai';

// atom
import { authAtom } from '@atoms/authAtom';

// api
import { api } from '@api/module';
import { globalClient } from '@api/client';
import { getMeApi } from '@api/queries';

// constants
import {
  API_ENDPOINTS,
  PAGE_ENDPOINTS,
  QUERIES_KEY,
} from '@constants/constant';

// error
import { ApiError } from '@libs/error';

// types
import type { ErrorApi } from '@api/schema/story-api';
import type { AuthResp } from '@api/schema/resp';
import type { SignupBody } from '@api/schema/body';

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

const postSignupApi = (body: SignupBody) =>
  api.post({
    url: API_ENDPOINTS.APP.AUTH.SIGNUP,
    body,
  });

export function useSignupMutation() {
  const router = useRouter();
  const setAuth = useSetAtom(authAtom);
  const [state, methods] = useMethods<
    ReturnType<typeof createMethods>,
    ErrorState
  >(createMethods, initialState);

  const resp = useMutation<AuthResp, ErrorApi, SignupBody>(postSignupApi, {
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
      return postSignupApi;
    },
    get state() {
      return state;
    },
    get method() {
      return methods;
    },
  };
}
