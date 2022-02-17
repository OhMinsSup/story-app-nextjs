import { useMutation, useQueryClient } from 'react-query';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS, RESULT_CODE } from '@constants/constant';

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
  const queryClient = useQueryClient();

  const fetcherModify = (input: Input) => {
    const id = input.dataId ?? '';
    return api.put({
      url: API_ENDPOINTS.LOCAL.USER.DETAIL(id),
      body: input,
    });
  };

  const onSuccess = async (data: StoryDataIdApi) => {
    const {
      data: { resultCode },
    } = data;

    if (resultCode === RESULT_CODE.OK) {
      await queryClient.invalidateQueries([API_ENDPOINTS.LOCAL.USER.ME]);
    }
  };

  const mutation = useMutation<StoryDataIdApi, StoryErrorApi, Input>(
    fetcherModify,
    {
      onSuccess,
    },
  );

  return mutation;
}
