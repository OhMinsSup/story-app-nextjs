import { QueryFunctionContext, QueryKey, useQuery } from 'react-query';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';
import { delay } from '@utils/utils';

export const fetchIllustractions = async ({
  queryKey,
}: QueryFunctionContext<QueryKey, any>) => {
  const [_key, _params] = queryKey;
  const response = await api.getMockResponse(API_ENDPOINTS.MOCK.ILLUSTRATION);

  await delay(3000);

  return response.data;
};

export const useIllustractionsQuery = (options?: any) => {
  return useQuery<{ items: MockIllustrationItem[] }>(
    [API_ENDPOINTS.MOCK.ILLUSTRATION, options],
    fetchIllustractions,
  );
};

export interface MockIllustrationItem {
  contractAddress: string;
  tokenId: string;
  tokenIndex: string;
  klaytnAddress: string;
  updatedAt: number;
  createdAt: number;
  name: string;
  description: string;
  image: string;
  background_color: string;
  attributes: any[];
  sendable: boolean;
  send_friend_only: boolean;
  external_link: string;
  external_url: string;
  profileImageUrl: string;
  nickname: string;
}
