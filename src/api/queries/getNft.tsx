import { useQuery } from '@tanstack/react-query';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS, QUERIES_KEY } from '@constants/constant';

// utils
import { isEmpty, Nullable } from '@utils/assertion';

import type { UseQueryOptions } from '@tanstack/react-query';
import type { Schema, ErrorApi } from '@api/schema/story-api';
import type { ItemDetailResp } from '@api/schema/resp';

/**
 * @description 내 정보 가져오는 API
 */
export const getItemDetailApi = async (id: number) => {
  const response = await api.get<ItemDetailResp>({
    url: API_ENDPOINTS.APP.ITEM.ID(id),
  });
  return response.data.result;
};

interface QueryOptions<TQueryFnData, TError, TData>
  extends Omit<
    UseQueryOptions<TQueryFnData, TError, TData, any>,
    'queryKey' | 'queryFn' | 'initialData'
  > {
  initialData?: any;
}

interface UseItemDetailQueryParams {
  id?: Nullable<number>;
  options?: QueryOptions<ItemDetailResp, ErrorApi<Schema>, ItemDetailResp>;
}

/**
 * @description 아이템 정보 가져오기 react query
 */
export const useItemDetailQuery = ({
  id,
  options,
}: UseItemDetailQueryParams) => {
  const resp = useQuery<ItemDetailResp, ErrorApi<Schema>>(
    QUERIES_KEY.ITEM_ID(id),
    (_key) => {
      const id = _key.queryKey.at(1) as number;
      return getItemDetailApi(id);
    },
    {
      enabled: isEmpty(id),
      staleTime: 10 * 60 * 1000, // 10m
      ...options,
    },
  );

  return {
    get item() {
      return resp.data;
    },
    get fetcher() {
      return getItemDetailApi;
    },
    ...resp,
  };
};
