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

export function useMutationStoryRegister() {
  const queryClient = useQueryClient();

  const fetcher = (input: MutationStoriesInput) =>
    api.postResponse({
      url: API_ENDPOINTS.LOCAL.STORY.ROOT,
      body: input,
    });

  const mutation = useMutation<
    StoryDataIdApi,
    StoryErrorApi,
    MutationStoriesInput
  >(fetcher, {
    mutationKey: [API_ENDPOINTS.LOCAL.STORY.ROOT, 'POST'],
    onSuccess: async (data) => {
      const {
        data: { result, resultCode },
      } = data;

      if (resultCode === RESULT_CODE.OK) {
        await queryClient.prefetchQuery([
          API_ENDPOINTS.LOCAL.STORY.DETAIL(result.dataId),
        ]);
      }
    },
  });

  return mutation;
}
