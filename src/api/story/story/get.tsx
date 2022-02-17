import { useQuery } from 'react-query';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';

import type { QueryFunctionContext, QueryKey } from 'react-query';
import type {
  DataIdParams,
  Schema,
  StoryErrorApi,
  StorySchema,
} from '@api/schema/story-api';

export const fetcherOne = async ({
  queryKey,
}: QueryFunctionContext<QueryKey, any>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  const id = _params as string | number;
  const response = await api.get({
    url: API_ENDPOINTS.LOCAL.STORY.DETAIL(id),
  });
  return response.data;
};

export const useStoryQuery = (id: DataIdParams) => {
  const { data, ...fields } = useQuery<Schema<StorySchema>, StoryErrorApi>(
    [API_ENDPOINTS.LOCAL.STORY.ROOT, Number(id)],
    fetcherOne,
    {
      retry: false,
      enabled: !!id,
      useErrorBoundary: true,
    },
  );
  return {
    data: data?.result,
    originData: data,
    ...fields,
  };
};
