import { useMutation } from 'react-query';
import shallow from 'zustand/shallow';

// api
import { api } from '@api/module';

// no components
import {
  API_ENDPOINTS,
  RESULT_CODE,
  STATUS_CODE,
  STORAGE_KEY,
} from '@constants/constant';
import { isAxiosError } from '@utils/utils';

// store
import { useStore } from '@store/store';

// types
import type {
  MutationLoginInput,
  LoginSchema,
  StoryErrorApi,
  StoryApi,
} from 'types/story-api';

export function useMutationLogin() {
  const { setAuth, setTokenNAddress } = useStore(
    (store) => ({
      setAuth: store.actions?.setAuth,
      setTokenNAddress: store.actions?.setTokenNAddress,
    }),
    shallow,
  );

  const fetcher = (input: MutationLoginInput) =>
    api.postResponse({
      url: API_ENDPOINTS.LOCAL.AUTH.LOGIN,
      body: input,
    });

  const mutation = useMutation<
    StoryApi<LoginSchema | string>,
    StoryErrorApi<string>,
    MutationLoginInput
  >(fetcher, {
    mutationKey: API_ENDPOINTS.LOCAL.AUTH.LOGIN,
    onSuccess: (data, variable) => {
      const {
        data: { result, resultCode, ok },
      } = data;

      if (resultCode === RESULT_CODE.NOT_EXIST && typeof result === 'string') {
        setTokenNAddress?.({
          signatureToken: result,
          walletAddress: variable.walletAddress,
        });
        return;
      }

      if (RESULT_CODE.OK === resultCode && typeof result === 'boolean') {
        // 회원 가입 성공
        return;
      }

      if (RESULT_CODE.OK === resultCode && typeof result === 'object') {
        const { accessToken, ...user } = result;
        // 로그인 성공
        localStorage.setItem(STORAGE_KEY.USER_KEY, JSON.stringify(user));
        setAuth?.(user);
        return;
      }
    },
    onError: (error, variable) => {
      if (!isAxiosError(error)) return;
      const { response } = error;
      switch (response?.status) {
        // 회원이 존재하지 않는 경우 회원가입 페이지 이동
        case STATUS_CODE.BAD_REQUEST: {
          const { result } = response.data;
          setTokenNAddress?.({
            signatureToken: result,
            walletAddress: variable.walletAddress,
          });
          break;
        }
        default:
          break;
      }
    },
  });

  return mutation;
}
