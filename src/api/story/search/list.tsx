import { useInfiniteQuery } from 'react-query';
import isEmpty from 'lodash-es/isEmpty';

import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';
import { makeQueryString } from '@utils/utils';

import type { QueryFunctionContext, EnsuredQueryKey } from 'react-query';
import type { ListSchema, StorySchema } from '@api/schema/story-api';

const SIZE = 10;

export const fetcherSearch = async ({
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
    url: `${API_ENDPOINTS.LOCAL.SEARCH.ROOT}${query}`,
  });
  return response.data.result;
};

export interface SearchParams {
  pageSize: number;
  backgrounds?: string[];
  tags?: string[];
  orderBy?: string;
  orderType?: string;
}

export function useSearchQuery(
  params: Partial<SearchParams> = {},
  enabled = true,
) {
  const getKey = () => {
    const keys: EnsuredQueryKey<any> = [API_ENDPOINTS.LOCAL.SEARCH.ROOT];
    if (isEmpty(params)) {
      return keys;
    }
    keys.push(params);
    return keys;
  };

  return useInfiniteQuery(getKey(), fetcherSearch, {
    retry: false,
    enabled,
    useErrorBoundary: true,
    getNextPageParam: (lastPage, allPages) => {
      const { total, pageNo } = lastPage;
      const size = params?.pageSize ?? SIZE;
      return pageNo + 1 <= Math.ceil(total / size) ? pageNo + 1 : null;
    },
  });
}
