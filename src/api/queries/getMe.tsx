import { useQuery } from 'react-query';
import { useCookieState } from '@hooks/useCookieState';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS, COOKIE_KEY } from '@constants/constant';

import type { Schema, StoryErrorApi, UserSchema } from '@api/schema/story-api';

export const getMe = async () => {
  const response = await api.get<UserSchema>({
    url: API_ENDPOINTS.LOCAL.USER.ME,
  });
  return response.data.result;
};

export const keyLoaderByMe = () => [API_ENDPOINTS.LOCAL.USER.ME];

export const staleTimeByMe = 10 * 60 * 1000; // 10 minute

export const useMeQuery = () => {
  const [state] = useCookieState(COOKIE_KEY.ACCESS_TOKEN);

  console.log('cookie', state);

  const { data, ...fields } = useQuery<UserSchema, StoryErrorApi<Schema>>(
    keyLoaderByMe(),
    getMe,
    {
      enabled: !!state,
      keepPreviousData: true,
      staleTime: staleTimeByMe,
      suspense: true,
      useErrorBoundary: true,
    },
  );

  return {
    userInfo: data,
    getMe,
    ...fields,
  };
};
