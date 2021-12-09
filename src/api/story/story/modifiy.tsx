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
} from 'types/story-api';

export function useMutationStoryModifiy() {
  const queryClient = useQueryClient();

  const fetcher = (
    input: PublishInput & {
      dataId: DataIdParams;
    },
  ) => {
    const id = input.dataId ?? '';
    return api.putResponse({
      url: API_ENDPOINTS.LOCAL.STORY.DETAIL(id),
      body: input,
    });
  };

  const mutation = useMutation<
    StoryDataIdApi,
    StoryErrorApi,
    PublishInput & {
      dataId: DataIdParams;
    }
  >(fetcher, {
    onSuccess: async (data, variables) => {
      const {
        data: { resultCode },
      } = data;
      if (resultCode === RESULT_CODE.OK) {
        await queryClient.prefetchQuery([
          API_ENDPOINTS.LOCAL.STORY.ROOT,
          variables.dataId,
        ]);
      }
    },
  });

  return mutation;
}
