// hooks
import { useMutation } from 'react-query';

// shallow
import shallow from 'zustand/shallow';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS, RESULT_CODE, STORAGE_KEY } from '@constants/constant';

// store
import { useStore } from '@store/store';

// storage
import { StoryStorage } from '@libs/storage';

// utils
import { isEmpty } from '@utils/assertion';

// types
import type {
  LoginInput,
  LoginSchema,
  StoryErrorApi,
  StoryApi,
} from '@api/schema/story-api';

const fetchPostLogin = async (body: LoginInput) => {
  return api.post({
    url: API_ENDPOINTS.LOCAL.AUTH.LOGIN,
    body,
  });
};

export function useLoginMutation() {
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

    if (RESULT_CODE.OK === resultCode && !isEmpty(result)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { accessToken, ...user } = result;
      setLoggedIn?.(true);
      setAuth?.(user);
      await StoryStorage.setItem(STORAGE_KEY.IS_LOGGED_IN_KEY, !!accessToken);
    }
  };

  const res = useMutation<StoryApi<LoginSchema>, StoryErrorApi, LoginInput>(
    fetchPostLogin,
    {
      onSuccess,
    },
  );

  return {
    ...res,
    fetchPostLogin,
  };
}
