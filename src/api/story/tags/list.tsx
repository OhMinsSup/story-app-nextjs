import { useInfiniteQuery } from 'react-query';
import isEmpty from 'lodash-es/isEmpty';
import { useErrorContext } from '@contexts/error/context';

import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';
import { makeQueryString } from '@utils/utils';

import type { QueryFunctionContext, EnsuredQueryKey } from 'react-query';
import type { ListSchema, TagSchema, Schema } from '@api/schema/story-api';
import type { AxiosError } from 'axios';

const SIZE = 10;

export const fetcherTags = async ({
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
  const response = await api.get<ListSchema<TagSchema>>({
    url: `${API_ENDPOINTS.LOCAL.TAGS.ROOT}${query}`,
  });
  return response.data.result;
};

export interface SearchParams {
  pageSize: number;
}

export function useTagsQuery(
  params: Partial<SearchParams> = {},
  enabled = true,
) {
  const { setGlobalError, setResetError } = useErrorContext();

  const getKey = () => {
    const keys: EnsuredQueryKey<any> = [API_ENDPOINTS.LOCAL.STORY.ROOT];
    if (isEmpty(params)) {
      return keys;
    }
    keys.push(params);
    return keys;
  };

  return useInfiniteQuery(getKey(), fetcherTags, {
    retry: false,
    enabled,
    useErrorBoundary: true,
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
