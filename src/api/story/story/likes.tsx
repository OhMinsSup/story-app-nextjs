import { useMutation, useQueryClient } from 'react-query';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS, RESULT_CODE } from '@constants/constant';

// types
import type {
  DataIdParams,
  StoryDataIdApi,
  StoryErrorApi,
} from '@api/schema/story-api';

const fetcherUnlike = (dataId: DataIdParams) => {
  const id = dataId ?? '';
  return api.delete({
    url: API_ENDPOINTS.LOCAL.STORY.LIKE(id),
  });
};

const fetcherLike = (dataId: DataIdParams) => {
  const id = dataId ?? '';
  return api.post({
    url: API_ENDPOINTS.LOCAL.STORY.LIKE(id),
    body: {},
  });
};

type Input = {
  dataId: DataIdParams;
  action: 'like' | 'unlike';
};

const fetcherAction = (input: Input) => {
  const { action, dataId } = input;
  if (action === 'like') {
    return fetcherLike(dataId);
  }
  return fetcherUnlike(dataId);
};

export function useMutationLike() {
  const queryClient = useQueryClient();

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
    fetcherAction,
    {
      onSuccess,
    },
  );

  return mutation;
}
