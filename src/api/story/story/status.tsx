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

export function useMutationStatusUpdate() {
  const queryClient = useQueryClient();

  const fetcherStatusUpdate = (data: DataIdSchema) =>
    api.put({
      url: API_ENDPOINTS.LOCAL.STORY.STATUS(data.dataId),
    });

  const onSuccess = async (data: StoryDataIdApi, variables: DataIdSchema) => {
    const {
      data: { resultCode },
    } = data;
    if (resultCode === RESULT_CODE.OK) {
      await queryClient.invalidateQueries([
        API_ENDPOINTS.LOCAL.STORY.ROOT,
        variables.dataId,
      ]);
    }
  };

  const mutation = useMutation<StoryApi, StoryErrorApi, DataIdSchema>(
    fetcherStatusUpdate,
    {
      onSuccess,
    },
  );

  return mutation;
}
