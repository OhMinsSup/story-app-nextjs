// hooks
import { useMutation, useQueryClient } from 'react-query';

// api
import { api } from '@api/module';
import { fetchMe } from '@api/queries';

// constants
import { API_ENDPOINTS, RESULT_CODE } from '@constants/constant';

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
import { useUserHook } from '@store/hook';

const fetchPostLogin = async (body: LoginInput) => {
  return api.post({
    url: API_ENDPOINTS.LOCAL.AUTH.LOGIN,
    body,
  });
};

export function useLoginMutation() {
  const queryClient = useQueryClient();

  const { setAuth } = useUserHook();

  const onSuccess = async (data: StoryApi<LoginSchema>) => {
    const {
      data: { result, resultCode },
    } = data;

    if (RESULT_CODE.OK === resultCode && !isEmpty(result)) {
      const queryKey = [API_ENDPOINTS.LOCAL.USER.ME];
      await queryClient.prefetchQuery(queryKey, fetchMe);
      const user = queryClient.getQueryData<UserSchema>(queryKey);
      if (user) setAuth?.(user);
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
