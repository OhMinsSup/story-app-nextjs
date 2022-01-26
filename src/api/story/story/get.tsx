import { useQuery } from 'react-query';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';
import { useErrorContext } from '@contexts/error/context';

import type { QueryFunctionContext, QueryKey } from 'react-query';
import type { AxiosError } from 'axios';
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
  const { setGlobalError, setResetError } = useErrorContext();

  const { data, ...fields } = useQuery<Schema<StorySchema>, StoryErrorApi>(
    [API_ENDPOINTS.LOCAL.STORY.ROOT, id],
    fetcherOne,
    {
      retry: false,
      enabled: !!id,
      useErrorBoundary: true,
      onError: (error: Error | AxiosError<Schema<any>>) => {
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
