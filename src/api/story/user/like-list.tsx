import { useInfiniteQuery } from 'react-query';
import isEmpty from 'lodash-es/isEmpty';

import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';
import { makeQueryString } from '@utils/utils';
import { useErrorContext } from '@contexts/error/context';

import type { AxiosError } from 'axios';
import type { QueryFunctionContext, EnsuredQueryKey } from 'react-query';
import type {
  DataIdParams,
  ListSchema,
  Schema,
  StorySchema,
} from '@api/schema/story-api';

const SIZE = 25;

export const fetcherStoryLikes = async ({
  queryKey,
  pageParam,
}: QueryFunctionContext<EnsuredQueryKey<any>, any>) => {
  const [_key, _params] = queryKey;
  const safeParams = _params || {};
  const query = makeQueryString({
    pageNo: pageParam ?? 1,
    pageSize: SIZE,
    ...safeParams,
  });
  const response = await api.get<ListSchema<StorySchema>>({
    url: `${_key}${query}`,
  });
  return response.data.result;
};

export interface SearchParams {
  pageSize: number;
}

export function useStoryLikesQuery(
  id: DataIdParams,
  params: Partial<SearchParams> = {},
  enabled = true,
) {
  const { setGlobalError, setResetError } = useErrorContext();

  const getKey = () => {
    if (!id) return null;
    const keys: EnsuredQueryKey<any> = [API_ENDPOINTS.LOCAL.USER.LIKES(id)];
    if (isEmpty(params)) {
      return keys;
    }
    keys.push(params);
    return keys;
  };

  return useInfiniteQuery(getKey(), fetcherStoryLikes, {
    retry: false,
    enabled: enabled && !!id,
    getNextPageParam: (lastPage) => {
      const { total, pageNo } = lastPage;
      const size = params?.pageSize ?? SIZE;
      return pageNo + 1 <= Math.ceil(total / size) ? pageNo + 1 : null;
    },
    onError: (error: Error | AxiosError<Schema<any>>) => {
      setGlobalError(error);
    },
    onSuccess: () => {
      setResetError();
    },
  });
}
