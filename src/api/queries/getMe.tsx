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
  const { setAuth, userInfo } = useUserHook();

  const { data, ...fields } = useQuery<UserSchema, StoryErrorApi<Schema>>(
    [API_ENDPOINTS.LOCAL.USER.ME],
    fetchMe,
    {
      staleTime: 60 * 1000, // 1 minute
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
