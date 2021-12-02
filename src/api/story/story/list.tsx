import { useInfiniteQuery } from 'react-query';
import isEmpty from 'lodash-es/isEmpty';

import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';
import { makeQueryString } from '@utils/utils';

import type {
  QueryFunctionContext,
  QueryKey,
  EnsuredQueryKey,
} from 'react-query';
import type { ListSchema, StorySchema } from 'types/story-api';

const SIZE = 10;

export const fetcherStories = async ({
  queryKey,
  pageParam,
  meta,
}: QueryFunctionContext<EnsuredQueryKey<any>, any>) => {
  const [_key, _params] = queryKey;
  console.log('_key', _key, _params, meta);
  const safeParams = _params || {};
  const query = makeQueryString({
    pageNo: pageParam ?? 1,
    pageSize: SIZE,
    ...safeParams,
  });
  const response = await api.getResponse<ListSchema<StorySchema>>({
    url: `${API_ENDPOINTS.LOCAL.STORY.ROOT}${query}`,
  });
  return response.data.result;
};

export interface SearchParams {
  pageSize: number;
  isPrivate: boolean;
  userId: number;
}

export function useStoriesQuery(
  params: Partial<SearchParams> = {},
  enabled = true,
) {
  const getKey = () => {
    const keys: EnsuredQueryKey<any> = [API_ENDPOINTS.LOCAL.STORY.ROOT];
    if (isEmpty(params)) {
      return keys;
    }
    keys.push(params);
    return keys;
  };

  return useInfiniteQuery(getKey(), fetcherStories, {
    retry: false,
    enabled,
    getNextPageParam: (lastPage, allPages) => {
      const { total, pageNo } = lastPage;
      // 페이지 넘버와 페이지 사이즈를 가지고 총 페이지 넘버보다 크면 더이상 불러오지 않는다.
      if (pageNo + 1 > total / SIZE) {
        return null;
      }
      return pageNo + 1;
    },
  });
}
