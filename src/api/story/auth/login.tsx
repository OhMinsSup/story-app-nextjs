import { useMutation } from 'react-query';
import shallow from 'zustand/shallow';

// api
import { api } from '@api/module';

// no components
import { API_ENDPOINTS, STATUS_CODE, STORAGE_KEY } from '@constants/constant';
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
  const { setAuth, setSignatureToken } = useStore(
    (store) => ({
      setAuth: store.actions?.setAuth,
      setSignatureToken: store.actions?.setSignatureToken,
    }),
    shallow,
  );

  return useMutation<
    StoryApi<LoginSchema>,
    StoryErrorApi<string>,
    MutationLoginInput
  >(
    (input) =>
      api.postResponse({
        url: API_ENDPOINTS.LOCAL.AUTH.LOGIN,
        body: input,
      }),
    {
      mutationKey: 'login',
      onSuccess: (data) => {
        if (data.data.result) {
          const {
            ok,
            result: { accessToken, ...user },
          } = data.data;

          // 로그인 성공
          if (ok) {
            localStorage.setItem(STORAGE_KEY.USER_KEY, JSON.stringify(user));
            setAuth?.(user);
          }
        }
      },
      onError: (error) => {
        if (!isAxiosError(error)) return;
        const { response } = error;
        switch (response?.status) {
          // 회원이 존재하지 않는 경우 회원가입 페이지 이동
          case STATUS_CODE.BAD_REQUEST: {
            const { result } = response.data;
            setSignatureToken?.(result);
            break;
          }
          default:
            break;
        }
      },
    },
  );
}
