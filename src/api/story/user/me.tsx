import shallow from 'zustand/shallow';

// hooks
import { useQuery } from 'react-query';
import { useStore } from '@store/store';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS } from '@constants/constant';

// types
import type { QueryFunctionContext, QueryKey } from 'react-query';
import type { Schema, StoryErrorApi, UserModel } from '@api/schema/story-api';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetcherMe = async (_: QueryFunctionContext<QueryKey, any>) => {
  const response = await api.get({
    url: API_ENDPOINTS.LOCAL.USER.ME,
  });
  return response.data.result;
};

export const useMeQuery = () => {
  const { setAuth, userInfo, isLoggedIn } = useStore(
    (store) => ({
      userInfo: store.userInfo,
      isLoggedIn: store.isLoggedIn,
      setAuth: store.actions?.setAuth,
    }),
    shallow,
  );

  const enabled = !userInfo && isLoggedIn;

  const { data, ...fields } = useQuery<UserModel, StoryErrorApi<Schema>>(
    [API_ENDPOINTS.LOCAL.USER.ME],
    fetcherMe,
    {
      enabled,
      retry: false,
      refetchOnWindowFocus: true,
      initialData: userInfo ?? undefined,
      onSuccess: (data) => setAuth?.(data),
    },
  );

  return {
    userInfo: userInfo ?? data,
    fetcherMe,
    ...fields,
  };
};
