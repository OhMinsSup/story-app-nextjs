import { useQuery } from 'react-query';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';
import { useErrorContext } from '@contexts/error/context';

import type { QueryFunctionContext, QueryKey } from 'react-query';
import type { DataIdParams, StorySchema, Schema } from '@api/schema/story-api';

export const fetcherAnothers = async ({
  queryKey,
}: QueryFunctionContext<QueryKey, any>) => {
  const [_key, _params] = queryKey;
  const { userId, storyId } = _params as Record<string, number>;
  const response = await api.get({
    url: API_ENDPOINTS.LOCAL.STORY.ANOTHERS(storyId, userId),
  });
  return response.data;
};

export const useAnothersQuery = (
  storyId: DataIdParams,
  userId: DataIdParams,
) => {
  const { setGlobalError, setResetError } = useErrorContext();
  const { data, ...fields } = useQuery<Schema<{ list: StorySchema[] }>, Schema>(
    [API_ENDPOINTS.LOCAL.STORY.ROOT, { storyId, userId }, 'ANOTHERS'],
    fetcherAnothers,
    {
      enabled: !!userId && !!storyId,
      onError: (error: any) => {
        setGlobalError(error);
      },
      onSuccess: () => {
        setResetError();
      },
    },
  );
  return {
    data: data?.result,
    originData: data,
    ...fields,
  };
};
