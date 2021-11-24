import { useQuery } from 'react-query';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';

import type { QueryFunctionContext, QueryKey } from 'react-query';
import type { DataIdParams, History, Schema } from 'types/story-api';

export const fetcherHistories = async ({
  queryKey,
}: QueryFunctionContext<QueryKey, any>) => {
  const [_key, _params] = queryKey;
  const id = _params as string | number;
  const response = await api.getResponse({
    url: API_ENDPOINTS.LOCAL.STORY.HISTORIES(id),
  });
  return response.data;
};

export const useHistoriesQuery = (id: DataIdParams) => {
  const { data, ...fields } = useQuery<Schema<{ list: History[] }>, Schema>(
    [API_ENDPOINTS.LOCAL.STORY.ROOT, id, 'HISTORIES'],
    fetcherHistories,
    {
      enabled: !!id,
    },
  );
  return {
    data: data?.result,
    originData: data,
    ...fields,
  };
};
