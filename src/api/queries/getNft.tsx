import { useQuery } from 'react-query';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';

import type { QueryFunctionContext, QueryKey } from 'react-query';
import type {
  DataIdParams,
  Schema,
  ErrorApi,
  StorySchema,
} from '@api/schema/story-api';

export const fetchNftDetail = async ({
  queryKey,
}: QueryFunctionContext<QueryKey, any>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  const id = _params as string | number;
  const response = await api.get({
    url: API_ENDPOINTS.LOCAL.STORY.ID(id),
  });
  return response.data;
};

export const useNftQuery = (id: DataIdParams) => {
  const { data, ...fields } = useQuery<Schema<StorySchema>, ErrorApi>(
    [
      API_ENDPOINTS.LOCAL.STORY.DETAIL,
      id ? parseInt(id.toString(), 10) : undefined,
    ].filter(Boolean),
    fetchNftDetail,
    {
      retry: false,
      enabled: !!id,
      useErrorBoundary: true,
    },
  );
  return {
    data: data?.result,
    originData: data,
    fetchNftDetail,
    ...fields,
  };
};
