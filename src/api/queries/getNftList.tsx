// hooks
import { useInfiniteQuery } from 'react-query';

// api
import { api } from '@api/module';

// contants
import { API_ENDPOINTS } from '@constants/constant';

// utils
import { isEmpty } from '@utils/assertion';
import { makeQueryString } from '@utils/utils';

import type { QueryFunctionContext } from 'react-query';
import type { ListSchema, StorySchema } from '@api/schema/story-api';

const SIZE = 25;

export const fetchNftList = async ({
  queryKey,
  pageParam,
}: QueryFunctionContext<any>) => {
  const [_key, _params] = queryKey;
  const safeParams = _params || {};
  const query = makeQueryString({
    pageNo: pageParam ?? 1,
    pageSize: SIZE,
    ...safeParams,
  });
  const response = await api.get<ListSchema<StorySchema>>({
    url: `${API_ENDPOINTS.LOCAL.STORY.ROOT}${query}`,
  });
  return response.data.result;
};

export interface SearchParams {
  pageSize: number;
  isPrivate: boolean;
  userId: number;
}

export function useNftListQuery(
  params: Partial<SearchParams> = {},
  enabled = true,
) {
  const queryKeyLoader = () => {
    const keys: any = [API_ENDPOINTS.LOCAL.STORY.ROOT];
    if (isEmpty(params)) {
      return keys;
    }
    keys.push(params);
    return keys;
  };

  const result = useInfiniteQuery(queryKeyLoader(), fetchNftList, {
    retry: false,
    enabled,
    useErrorBoundary: true,
    getNextPageParam: (lastPage) => {
      const { total, pageNo } = lastPage;
      const size = params?.pageSize ?? SIZE;
      return pageNo + 1 <= Math.ceil(total / size) ? pageNo + 1 : null;
    },
  });

  return {
    ...result,
    fetchNftList,
  };
}
