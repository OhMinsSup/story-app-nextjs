import { useQuery } from 'react-query';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';

import type { QueryFunctionContext, QueryKey } from 'react-query';
import type {
  DataIdParams,
  UserModel,
  Schema,
  StoryErrorApi,
} from '@api/schema/story-api';

export const fetcherProfile = async ({
  queryKey,
}: QueryFunctionContext<QueryKey, any>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  const id = _params as string | number;
  const response = await api.get({
    url: API_ENDPOINTS.LOCAL.USER.DETAIL(id),
  });
  return response.data;
};

export const useUserProfileQuery = (id: DataIdParams) => {
  const queryKey = [API_ENDPOINTS.LOCAL.USER.ROOT, id];

  const { data, ...fields } = useQuery<Schema<UserModel>, StoryErrorApi>(
    queryKey,
    fetcherProfile,
    {
      enabled: !!id,
      useErrorBoundary: true,
      retry: false,
    },
  );
  return {
    data: data?.result,
    originData: data,
    queryKey,
    ...fields,
  };
};
