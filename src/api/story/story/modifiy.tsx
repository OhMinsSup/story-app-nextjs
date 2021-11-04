import { useMutation, useQueryClient } from 'react-query';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS, RESULT_CODE } from '@constants/constant';

// types
import type {
  MutationStoriesInput,
  StoryDataIdApi,
  StoryErrorApi,
} from 'types/story-api';

export function useMutationStoryModifiy(dataId: number) {
  const queryClient = useQueryClient();

  const fetcher = (input: MutationStoriesInput) =>
    api.putResponse({
      url: API_ENDPOINTS.LOCAL.STORY.DETAIL(dataId),
      body: input,
    });

  const mutation = useMutation<
    StoryDataIdApi,
    StoryErrorApi,
    MutationStoriesInput
  >(fetcher, {
    mutationKey: [API_ENDPOINTS.LOCAL.STORY.DETAIL(dataId), 'PUT'],
    onSuccess: async (data) => {
      const {
        data: { resultCode },
      } = data;
      if (resultCode === RESULT_CODE.OK) {
        await queryClient.prefetchQuery([
          API_ENDPOINTS.LOCAL.STORY.DETAIL(dataId),
        ]);
      }
    },
  });

  return mutation;
}
