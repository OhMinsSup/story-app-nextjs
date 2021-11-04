import { useMutation, useQueryClient } from 'react-query';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS, RESULT_CODE } from '@constants/constant';

// types
import type {
  MutationStoriesInput,
  StoryApi,
  StoryErrorApi,
} from 'types/story-api';

export function useMutationStoryDelete(dataId: number) {
  const queryClient = useQueryClient();

  const fetcher = () =>
    api.deleteResponse({
      url: API_ENDPOINTS.LOCAL.STORY.DETAIL(dataId),
    });

  const mutation = useMutation<StoryApi, StoryErrorApi, MutationStoriesInput>(
    fetcher,
    {
      mutationKey: [API_ENDPOINTS.LOCAL.STORY.DETAIL(dataId), 'DELETE'],
      onSuccess: async (data) => {
        const {
          data: { resultCode },
        } = data;
        if (resultCode === RESULT_CODE.OK) {
          queryClient.invalidateQueries(
            API_ENDPOINTS.LOCAL.STORY.DETAIL(dataId),
          );
        }
      },
    },
  );

  return mutation;
}
