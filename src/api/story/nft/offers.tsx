import { useQuery } from 'react-query';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';

import type { QueryFunctionContext, QueryKey } from 'react-query';
import type { DataIdParams, OfferSchema, Schema } from '@api/schema/story-api';

export const fetcherOffers = async ({
  queryKey,
}: QueryFunctionContext<QueryKey, any>) => {
  const [_key, _params] = queryKey;
  const id = _params as string | number;
  const response = await api.get({
    url: API_ENDPOINTS.LOCAL.STORY.NFT.OFFERS(id),
  });
  return response.data;
};

export const useOffersQuery = (id: DataIdParams) => {
  const { data, ...fields } = useQuery<Schema<{ list: OfferSchema[] }>, Schema>(
    [API_ENDPOINTS.LOCAL.STORY.ROOT, id, 'OFFERS'],
    fetcherOffers,
    {
      enabled: !!id,
      useErrorBoundary: true,
      retry: false,
    },
  );

  return {
    data: data?.result,
    originData: data,
    ...fields,
  };
};
