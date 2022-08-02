import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

// atom
import { authAtom } from '@atoms/authAtom';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS, QUERIES_KEY } from '@constants/constant';

import type { Schema, ErrorApi, UserSchema } from '@api/schema/story-api';

export const getMe = async () => {
  const response = await api.get<UserSchema>({
    url: API_ENDPOINTS.LOCAL.USER.ME,
  });
  return response.data.result;
};

export const staleTimeByMe = 10 * 60 * 1000; // 10 minute

export const useMeQuery = () => {
  const isAuthication = useAtomValue(authAtom);

  const resp = useQuery<UserSchema, ErrorApi<Schema>>(QUERIES_KEY.ME, getMe, {
    enabled: isAuthication,
    staleTime: staleTimeByMe,
  });

  return {
    get userInfo() {
      return resp.data;
    },
    get fetch() {
      return getMe;
    },
    ...resp,
  };
};
