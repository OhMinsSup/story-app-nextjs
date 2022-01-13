import { useQuery } from 'react-query';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';
import { useErrorContext } from '@contexts/error/context';

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
  const response = await api.getResponse({
    url: API_ENDPOINTS.LOCAL.STORY.HISTORIES(id),
  });
  return response.data;
};

export const useHistoriesQuery = (id: DataIdParams) => {
  const { setGlobalError, setResetError } = useErrorContext();

  const { data, ...fields } = useQuery<
    Schema<{ list: HistorySchema[] }>,
    Schema
  >([API_ENDPOINTS.LOCAL.STORY.ROOT, id, 'HISTORIES'], fetcherHistories, {
    enabled: !!id,
    onError: (error: any) => {
      setGlobalError(error);
    },
    onSuccess: () => {
      setResetError();
    },
  });
  return {
    data: data?.result,
    originData: data,
    ...fields,
  };
};
