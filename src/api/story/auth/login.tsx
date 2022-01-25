import { useMutation } from 'react-query';
import shallow from 'zustand/shallow';

// api
import { api } from '@api/module';

// no components
import { API_ENDPOINTS, RESULT_CODE, STORAGE_KEY } from '@constants/constant';

// store
import { useStore } from '@store/store';

// types
import type {
  LoginInput,
  LoginSchema,
  StoryErrorApi,
  StoryApi,
} from '@api/schema/story-api';
import { StoryStorage } from '@libs/storage';

const fetcherLogin = (input: LoginInput) =>
  api.post({
    url: API_ENDPOINTS.LOCAL.AUTH.LOGIN,
    body: input,
  });

export function useMutationLogin() {
  const { setAuth, setLoggedIn } = useStore(
    ({ actions }) => ({
      setAuth: actions?.setAuth,
      setLoggedIn: actions?.setLoggedIn,
    }),
    shallow,
  );

  const onSuccess = async (data: StoryApi<LoginSchema>) => {
    const {
      data: { result, resultCode },
    } = data;

    if (RESULT_CODE.OK === resultCode && typeof result === 'object') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { accessToken, ...user } = result;
      setLoggedIn?.(true);
      setAuth?.(user);
      await StoryStorage.setItem(STORAGE_KEY.IS_LOGGED_IN_KEY, !!accessToken);
    }
  };

  const mutation = useMutation<
    StoryApi<LoginSchema>,
    StoryErrorApi,
    LoginInput
  >(fetcherLogin, {
    onSuccess,
  });

  return mutation;
}
