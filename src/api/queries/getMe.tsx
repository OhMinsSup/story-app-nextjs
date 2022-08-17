import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

// atom
import { authAtom } from '@atoms/authAtom';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS, QUERIES_KEY } from '@constants/constant';

import type { Schema, ErrorApi } from '@api/schema/story-api';
import type { MeResp } from '@api/schema/resp';

/**
 * @description 내 정보 가져오는 API
 */
export const getMeApi = async () => {
  const response = await api.get<MeResp>({
    url: API_ENDPOINTS.APP.USERS.ME,
  });
  return response.data.result;
};

/**
 * @description 내 정보 가져오기 react query
 */
export const useMeQuery = () => {
  const isAuthication = useAtomValue(authAtom);

  const resp = useQuery<MeResp | null, ErrorApi<Schema>>(
    QUERIES_KEY.ME,
    getMeApi,
    {
      enabled: isAuthication,
      staleTime: 10 * 60 * 1000, // 10m
    },
  );

  return {
    get userInfo() {
      return resp.data;
    },
    get fetcher() {
      return getMeApi;
    },
    ...resp,
  };
};
