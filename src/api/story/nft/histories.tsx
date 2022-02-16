import { useQuery } from 'react-query';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';

import type { QueryFunctionContext, QueryKey } from 'react-query';
import type {
  DataIdParams,
  HistorySchema,
  Schema,
} from '@api/schema/story-api';

export const fetcherHistories = async ({
  queryKey,
}: QueryFunctionContext<QueryKey, any>) => {
  const [_key, _params] = queryKey;
  const id = _params as string | number;
  const response = await api.get({
    url: API_ENDPOINTS.LOCAL.STORY.NFT.HISTORIES(id),
  });
  return response.data;
};

export const useHistoriesQuery = (id: DataIdParams) => {
  const { data, ...fields } = useQuery<
    Schema<{ list: HistorySchema[] }>,
    Schema
  >([API_ENDPOINTS.LOCAL.STORY.ROOT, id, 'HISTORIES'], fetcherHistories, {
    enabled: !!id,
    useErrorBoundary: true,
    retry: false,
  });
  return {
    data: data?.result,
    originData: data,
    ...fields,
  };
};
