import { useInfiniteQuery } from 'react-query';

import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';

import type { QueryFunctionContext, QueryKey } from 'react-query';
import type { ListSchema, StorySchema } from 'types/story-api';
import { makeQueryString } from '@utils/utils';

const SIZE = 10;

export const fetcherStories = async ({
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKey, any>) => {
  const [_key, _params] = queryKey;
  const query = makeQueryString({
    pageNo: pageParam ?? 1,
    pageSize: SIZE,
  });
  const response = await api.getResponse<ListSchema<StorySchema>>({
    url: `${API_ENDPOINTS.LOCAL.STORY.ROOT}${query}`,
  });
  return response.data.result;
};

export function useStoriesQuery() {
  return useInfiniteQuery([API_ENDPOINTS.LOCAL.STORY.ROOT], fetcherStories, {
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
