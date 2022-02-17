import { useMutation, useQueryClient } from 'react-query';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS, RESULT_CODE } from '@constants/constant';

// types
import type {
  DataIdSchema,
  StoryApi,
  StoryDataIdApi,
  StoryErrorApi,
} from '@api/schema/story-api';

export function useMutationStoryDelete() {
  const queryClient = useQueryClient();

  const fetcherDelete = (data: DataIdSchema) =>
    api.delete({
      url: API_ENDPOINTS.LOCAL.STORY.DETAIL(data.dataId),
    });

  const onSuccess = async (data: StoryDataIdApi, variables: DataIdSchema) => {
    const {
      data: { resultCode },
    } = data;
    if (resultCode === RESULT_CODE.OK) {
      queryClient.removeQueries([
        API_ENDPOINTS.LOCAL.STORY.ROOT,
        Number(variables.dataId),
      ]);
    }
  };

  const mutation = useMutation<StoryApi, StoryErrorApi, DataIdSchema>(
    fetcherDelete,
    {
      onSuccess,
    },
  );

  return mutation;
}
