// hooks
import { useMutation, useQueryClient } from 'react-query';

// shallow
import shallow from 'zustand/shallow';

// api
import { api } from '@api/module';
import { fetchMe } from '@api/queries';

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
  UserSchema,
} from '@api/schema/story-api';

const fetchPostLogin = async (body: LoginInput) => {
  return api.post({
    url: API_ENDPOINTS.LOCAL.AUTH.LOGIN,
    body,
  });
};

export function useLoginMutation() {
  const queryClient = useQueryClient();

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
      const { accessToken } = result;

      const queryKey = [API_ENDPOINTS.LOCAL.USER.ME];

      await queryClient.prefetchQuery(queryKey, fetchMe);

      const user = queryClient.getQueryData<UserSchema>(queryKey);
      if (user) setAuth?.(user);

      await StoryStorage.setItem(STORAGE_KEY.IS_LOGGED_IN_KEY, !!accessToken);

      setLoggedIn?.(true);
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
