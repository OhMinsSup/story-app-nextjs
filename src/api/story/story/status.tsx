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

interface Input extends DataIdSchema {
  status: string;
}

export function useMutationStatusUpdate() {
  const queryClient = useQueryClient();

  const fetcherStatusUpdate = (data: Input) =>
    api.put({
      url: API_ENDPOINTS.LOCAL.STORY.STATUS(data.dataId),
      body: {
        status: data.status,
      },
    });

  const onSuccess = async (data: StoryDataIdApi, variables: Input) => {
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

  const mutation = useMutation<StoryApi, StoryErrorApi, Input>(
    fetcherStatusUpdate,
    {
      onSuccess,
    },
  );

  return mutation;
}
