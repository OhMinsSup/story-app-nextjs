import { useMutation, useQueryClient } from 'react-query';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS, RESULT_CODE } from '@constants/constant';

// types
import type {
  DataIdParams,
  PublishInput,
  StoryDataIdApi,
  StoryErrorApi,
} from '@api/schema/story-api';

export type Input = PublishInput & {
  dataId: DataIdParams;
};

export function useMutationStoryModifiy() {
  const queryClient = useQueryClient();

  const fetcherModify = (input: Input) => {
    const id = input.dataId ?? '';
    return api.putResponse({
      url: API_ENDPOINTS.LOCAL.STORY.DETAIL(id),
      body: input,
    });
  };

  const onSuccess = async (data: StoryDataIdApi, variables: Input) => {
    const {
      data: { resultCode },
    } = data;
    if (resultCode === RESULT_CODE.OK) {
      await queryClient.prefetchQuery([
        API_ENDPOINTS.LOCAL.STORY.ROOT,
        variables.dataId,
      ]);
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
