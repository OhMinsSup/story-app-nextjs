// hooks
import { useMutation } from '@tanstack/react-query';
import { useMethods } from 'react-use';
import { useRouter } from 'next/router';
import { useSetAtom } from 'jotai';

// api
import { api } from '@api/module';
import { globalClient } from '@api/client';
import { getMe } from '@api/queries';

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
import type { LoginBody } from '@api/schema/body';

interface ErrorState {
  message: string;
}

const initialState: ErrorState = {
  message: '',
};

function createMethods(state: ErrorState) {
  return {
    reset() {
      return initialState;
    },
    setErrorMessage(message: string) {
      return {
        ...state,
        message,
      };
    },
  };
}

export const postLogin = (body: LoginBody) =>
  api.post({
    url: API_ENDPOINTS.LOCAL.AUTH.LOGIN,
    body,
  });

export function useLoginMutation() {
  const router = useRouter();
  const setAuth = useSetAtom(authAtom);

  const [state, methods] = useMethods<
    ReturnType<typeof createMethods>,
    ErrorState
  >(createMethods, initialState);

  const resp = useMutation<SigninResp, ErrorApi, LoginBody>(postLogin, {
    onMutate() {
      methods.reset();
    },
    async onSuccess(data) {
      const { ok } = data.data;
      if (!ok) return;

      await globalClient.prefetchQuery(QUERIES_KEY.ME, getMe);
      setAuth(true);
      router.replace(PAGE_ENDPOINTS.INDEX);
    },
    onError(error) {
      if (ApiError.isApiError(error)) {
        const { message } = error.toApiErrorJSON();
        methods.setErrorMessage(message?.message);
        return;
      }
    },
  });

  return {
    ...resp,
    get fetcher() {
      return postLogin;
    },
    get state() {
      return state;
    },
    get method() {
      return methods;
    },
  };
}
