import { useQuery } from 'react-query';
import { useAtomValue, useSetAtom } from 'jotai';

// atom
import { asyncWriteOnlyUserAtom } from '@atoms/userAtom';
import { authAtom } from '@atoms/authAtom';

// api
import { api } from '@api/module';

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
  const session = useAtomValue(authAtom);

  const setAsyncUserAtom = useSetAtom(asyncWriteOnlyUserAtom);

  const { data, ...fields } = useQuery<UserSchema, StoryErrorApi<Schema>>(
    keyLoaderByMe,
    getMe,
    {
      enabled: session,
      staleTime: staleTimeByMe,
      onSuccess: (data) => {
        if (isEmpty(data)) return;
        setAsyncUserAtom(data);
      },
    },
  );

  return {
    userInfo: data,
    getMe,
    ...fields,
  };
};
