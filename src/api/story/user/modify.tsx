import { useMutation } from 'react-query';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS } from '@constants/constant';

// types
import type {
  DataIdParams,
  ProfileInput,
  StoryDataIdApi,
  StoryErrorApi,
} from '@api/schema/story-api';

export type Input = ProfileInput & {
  dataId: DataIdParams;
};

export function useMutationProfileModify() {
  const fetcherModify = (input: Input) => {
    const id = input.dataId ?? '';
    return api.putResponse({
      url: API_ENDPOINTS.LOCAL.USER.DETAIL(id),
      body: input,
    });
  };

  const mutation = useMutation<StoryDataIdApi, StoryErrorApi, Input>(
    fetcherModify,
  );

  return mutation;
}
