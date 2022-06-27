import { useQuery, useQueryClient } from 'react-query';
import { useNotfiyManager } from '@libs/state/notifyManager';
import { useSetAtom } from 'jotai';

// atom
import { asyncWriteOnlyUserAtom } from '@atoms/authAtom';

// api
import { api } from '@api/module';

// error
import { ApiError } from '@libs/error';

// constants
import { API_ENDPOINTS, STATUS_CODE } from '@constants/constant';

// utils
import { isEmpty } from '@utils/assertion';

import type { Schema, StoryErrorApi, UserSchema } from '@api/schema/story-api';

export const getMe = async () => {
  const response = await api.get<UserSchema>({
    url: API_ENDPOINTS.LOCAL.USER.ME,
  });
  return response.data.result;
};

export const keyLoader = [API_ENDPOINTS.LOCAL.USER.ME];

export const staleTimeByMe = 10 * 60 * 1000; // 10 minute

export const useMeQuery = () => {
  const notfiy = useNotfiyManager();
  const queryClient = useQueryClient();

  const setAsyncUserAtom = useSetAtom(asyncWriteOnlyUserAtom);

  const { data, ...fields } = useQuery<UserSchema, StoryErrorApi<Schema>>(
    keyLoader,
    getMe,
    {
      keepPreviousData: true,
      staleTime: staleTimeByMe,
      onSuccess: (data) => {
        if (isEmpty(data)) return;
        setAsyncUserAtom(data);
      },
      onError: async (err) => {
        if (ApiError.isAxiosError(err)) {
          switch (err.response?.status) {
            case STATUS_CODE.FORBIDDEN:
            case STATUS_CODE.UNAUTHORIZED: {
              notfiy.schedule(() => {
                api.logout();
              });
              break;
            }
            default:
              break;
          }
        }
      },
    },
  );

  const clearByMe = () => {
    queryClient.removeQueries(keyLoader);
  };

  return {
    userInfo: data,
    getMe,
    ...fields,
  };
};
