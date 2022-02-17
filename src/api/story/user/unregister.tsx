import { useMutation, useQueryClient } from 'react-query';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS, RESULT_CODE } from '@constants/constant';

// types
import type {
  DataIdParams,
  StoryApi,
  StoryErrorApi,
} from '@api/schema/story-api';

export function useMutationUnRegister() {
  const queryClient = useQueryClient();

  const fetcherUnRegister = (dataId: DataIdParams) => {
    const id = dataId ?? '';
    return api.put({
      url: API_ENDPOINTS.LOCAL.USER.UNREGIISTER(id),
    });
  };

  const onSuccess = async (data: StoryApi) => {
    const {
      data: { resultCode },
    } = data;

    if (resultCode === RESULT_CODE.OK) {
      queryClient.removeQueries([API_ENDPOINTS.LOCAL.USER.ME]);
    }
  };

  const mutation = useMutation<StoryApi, StoryErrorApi, DataIdParams>(
    fetcherUnRegister,
    {
      onSuccess,
    },
  );

  return mutation;
}
