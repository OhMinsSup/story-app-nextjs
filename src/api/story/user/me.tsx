import { useQuery } from 'react-query';
import shallow from 'zustand/shallow';
import { useStore } from '@store/store';
import { parseCookies } from 'nookies';

import { api } from '@api/module';

import { API_ENDPOINTS, STATUS_CODE } from '@constants/constant';
import { isAxiosError } from '@utils/utils';

import type { QueryFunctionContext, QueryKey } from 'react-query';
import type { Schema, StoryErrorApi, UserModel } from '@api/schema/story-api';

export const fetcherMe = async ({
  queryKey,
}: QueryFunctionContext<QueryKey, any>) => {
  const [_key, _params] = queryKey;
  const response = await api.getResponse({
    url: API_ENDPOINTS.LOCAL.USER.ME,
  });
  return response.data.result;
};

export const useMeQuery = () => {
  const { setAuth, userInfo } = useStore(
    (store) => ({
      userInfo: store.userInfo,
      setAuth: store.actions?.setAuth,
    }),
    shallow,
  );

  const { data, ...fields } = useQuery<UserModel, StoryErrorApi<Schema>>(
    [API_ENDPOINTS.LOCAL.USER.ME],
    fetcherMe,
    {
      enabled: !userInfo,
      initialData: userInfo ?? undefined,
      onSuccess: (data) => setAuth?.(data),
      onError: (error) => {
        if (isAxiosError(error)) {
          const { response } = error;
          if (response?.status === STATUS_CODE.FORBIDDEN) {
            setAuth?.(null);
          }
        }
      },
    },
  );

  return {
    userInfo: userInfo ?? data,
    ...fields,
  };
};
