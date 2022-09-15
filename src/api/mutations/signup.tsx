// hooks
import { useMutation } from '@tanstack/react-query';
import { useMethods } from 'react-use';
import { useSetAtom } from 'jotai';

// atom
import { authAtom } from '@atoms/authAtom';

// api
import { api } from '@api/module';
import { globalClient } from '@api/client';
import { getMeApi } from '@api/queries';

// constants
import { API_ENDPOINTS, QUERIES_KEY, STATUS_CODE } from '@constants/constant';

// error
import { ApiError } from '@libs/error';

// types
import type { ErrorApi } from '@api/schema/story-api';
import type { AuthResp } from '@api/schema/resp';
import type { SignupBody, SignupByKeystoreBody } from '@api/schema/body';

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

const postKeystoreSignupApi = (body: SignupByKeystoreBody) => {
  const formData = new FormData();
  formData.append('email', body.email);
  formData.append('username', body.username);
  formData.append('password', body.password);
  formData.append('file', body.file);
  if (body.profileUrl) {
    formData.append('profileUrl', body.profileUrl);
  }
  return api.post({
    url: API_ENDPOINTS.APP.AUTH.KEYSTORE.SIGNUP,
    body: formData,
    config: {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  });
};

export function useSignupMutation() {
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

export function useSignupByKeystoreMutation() {
  const setAuth = useSetAtom(authAtom);

  const [state, methods] = useMethods<
    ReturnType<typeof createMethods>,
    ErrorState
  >(createMethods, initialState);

  const resp = useMutation<AuthResp, ErrorApi, SignupByKeystoreBody>(
    postKeystoreSignupApi,
    {
      async onSuccess(data) {
        const result = data.data?.result;
        if (result?.userId) {
          await globalClient.prefetchQuery(QUERIES_KEY.ME, getMeApi);
        }
        setAuth(true);
      },
      onError(error) {
        if (ApiError.isAxiosError(error)) {
          switch (error.response?.status) {
            case STATUS_CODE.SERVER_ERROR: {
              return;
            }
            case STATUS_CODE.NOT_FOUND: {
              // router
              return;
            }
            default: {
              const jsonData = error.response?.data;
              const message = jsonData?.message?.toString() || '';
              const code = jsonData?.resultCode || -1;

              methods.setErrorMessage({
                code,
                message,
              });
              return;
            }
          }
        } else {
          // 500 에러
        }
      },
    },
  );

  return {
    ...resp,
    get fetcher() {
      return postKeystoreSignupApi;
    },
    get state() {
      return state;
    },
    get method() {
      return methods;
    },
  };
}
