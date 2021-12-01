import { useQuery } from 'react-query';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';

import type { QueryFunctionContext, QueryKey } from 'react-query';
import type {
  DataIdParams,
  UserModel,
  Schema,
  StoryErrorApi,
} from 'types/story-api';

export const fetcherProfile = async ({
  queryKey,
}: QueryFunctionContext<QueryKey, any>) => {
  const [_key, _params] = queryKey;
  const id = _params as string | number;
  const response = await api.getResponse({
    url: API_ENDPOINTS.LOCAL.USER.DETAIL(id),
  });
  return response.data;
};

export const useUserProfileQuery = (id: DataIdParams) => {
  const { data, ...fields } = useQuery<Schema<UserModel>, StoryErrorApi>(
    [API_ENDPOINTS.LOCAL.USER.ROOT, id],
    fetcherProfile,
    {
      retry: false,
      enabled: !!id,
    },
  );
  return {
    data: data?.result,
    originData: data,
    ...fields,
  };
};
