import { useQuery } from 'react-query';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';

import type { QueryFunctionContext, QueryKey } from 'react-query';
import type { DataIdParams, Schema, StorySchema } from 'types/story-api';

export const fetcherOne = async ({
  queryKey,
}: QueryFunctionContext<QueryKey, any>) => {
  const [_key, _params] = queryKey;
  const id = _params as string | number;
  const response = await api.getResponse({
    url: API_ENDPOINTS.LOCAL.STORY.DETAIL(id),
  });
  return response.data;
};

export const useStoryQuery = (id: DataIdParams) => {
  const query = useQuery<Schema<StorySchema>, Schema<any>>(
    [API_ENDPOINTS.LOCAL.STORY.ROOT, id],
    fetcherOne,
    {
      enabled: !!id,
    },
  );
  return query;
};
