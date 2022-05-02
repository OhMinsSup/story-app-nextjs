import { useQuery } from 'react-query';
import { useUserHook } from '@store/hook';

import { api } from '@api/module';

import { API_ENDPOINTS } from '@constants/constant';

import type { Schema, StoryErrorApi, UserSchema } from '@api/schema/story-api';

export const fetchMe = async () => {
  const response = await api.get({
    url: API_ENDPOINTS.LOCAL.USER.ME,
  });
  return response.data.result;
};

export const useMeQuery = () => {
  const { setAuth, userInfo, isLoggedIn } = useUserHook();
  console.log('useMeQuery', userInfo, isLoggedIn);

  const enabled = !userInfo && isLoggedIn;

  const { data, ...fields } = useQuery<UserSchema, StoryErrorApi<Schema>>(
    [API_ENDPOINTS.LOCAL.USER.ME],
    fetchMe,
    {
      enabled,
      retry: false,
      initialData: userInfo ?? undefined,
      onSuccess: (data) => setAuth?.(data),
    },
  );

  return {
    userInfo: userInfo ?? data,
    fetchMe,
    ...fields,
  };
};
