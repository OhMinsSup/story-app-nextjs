import { useQuery } from 'react-query';
import { useNotfiyManager } from '@libs/state/notifyManager';
import { useAtom, useSetAtom } from 'jotai';

// atom
import { asyncWriteOnlyUserAtom } from '@atoms/userAtom';
import { authAtom } from '@atoms/authAtom';

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

export const keyLoaderByMe = [API_ENDPOINTS.LOCAL.USER.ME];

export const staleTimeByMe = 10 * 60 * 1000; // 10 minute

export const useMeQuery = () => {
  const notfiy = useNotfiyManager();
  const [hasSession, setSession] = useAtom(authAtom);

  const setAsyncUserAtom = useSetAtom(asyncWriteOnlyUserAtom);

  const { data, ...fields } = useQuery<UserSchema, StoryErrorApi<Schema>>(
    keyLoaderByMe,
    getMe,
    {
      enabled: hasSession,
      staleTime: staleTimeByMe,
      onSuccess: (data) => {
        if (isEmpty(data)) return;
        setAsyncUserAtom(data);
      },
      onError: (err) => {
        if (ApiError.isAxiosError(err)) {
          switch (err.response?.status) {
            case STATUS_CODE.FORBIDDEN:
            case STATUS_CODE.UNAUTHORIZED: {
              notfiy.schedule(() => {
                setSession(false);
              });
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

  return {
    userInfo: data,
    getMe,
    ...fields,
  };
};
