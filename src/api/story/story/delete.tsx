import { useMutation, useQueryClient } from 'react-query';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS, RESULT_CODE } from '@constants/constant';

// types
import type { DataIdSchema, StoryApi, StoryErrorApi } from 'types/story-api';

export function useMutationStoryDelete() {
  const queryClient = useQueryClient();

  const fetcher = (data: DataIdSchema) =>
    api.deleteResponse({
      url: API_ENDPOINTS.LOCAL.STORY.DETAIL(data.dataId),
    });

  const mutation = useMutation<StoryApi, StoryErrorApi, DataIdSchema>(fetcher, {
    onSuccess: async (data, variables) => {
      const {
        data: { resultCode },
      } = data;
      if (resultCode === RESULT_CODE.OK) {
        queryClient.invalidateQueries(
          API_ENDPOINTS.LOCAL.STORY.DETAIL(variables.dataId),
        );
      }
    },
  });

  return mutation;
}
