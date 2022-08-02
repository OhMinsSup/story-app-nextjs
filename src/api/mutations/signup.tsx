// hooks
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useMethods } from 'react-use';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS, PAGE_ENDPOINTS } from '@constants/constant';

// error
import { ApiError } from '@libs/error';

// types
import type { ErrorApi } from '@api/schema/story-api';
import type { SignupResp } from '@api/schema/resp';
import type { SignupBody } from '@api/schema/body';

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

const postSignup = (body: SignupBody) =>
  api.post({
    url: API_ENDPOINTS.LOCAL.AUTH.SIGNUP,
    body,
  });

export function useSignupMutation() {
  const router = useRouter();
  const [state, methods] = useMethods<
    ReturnType<typeof createMethods>,
    ErrorState
  >(createMethods, initialState);

  const resp = useMutation<SignupResp, ErrorApi, SignupBody>(postSignup, {
    onMutate() {
      methods.reset();
    },
    onSuccess(data) {
      const { ok } = data.data;
      if (!ok) return;
      router.replace(PAGE_ENDPOINTS.LOGIN);
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
      return postSignup;
    },
    get state() {
      return state;
    },
    get method() {
      return methods;
    },
  };
}
