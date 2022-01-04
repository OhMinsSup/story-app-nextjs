import { useQuery } from 'react-query';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';
import { useErrorContext } from '@contexts/error/context';

import type { QueryFunctionContext, QueryKey } from 'react-query';
import type {
  DataIdParams,
  UserModel,
  Schema,
  StoryErrorApi,
} from '@api/schema/story-api';
import type { AxiosError } from 'axios';

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
  const { setGlobalError, setResetError } = useErrorContext();

  const { data, ...fields } = useQuery<Schema<UserModel>, StoryErrorApi>(
    [API_ENDPOINTS.LOCAL.USER.ROOT, id],
    fetcherProfile,
    {
      retry: false,
      enabled: !!id,
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
