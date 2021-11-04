import { useMutation } from 'react-query';

// api
import { api } from '@api/module';

// contatns
import { API_ENDPOINTS } from '@constants/constant';

import type {
  MutationSignupInput,
  StoryApi,
  StoryErrorApi,
} from 'types/story-api';

export function useMutationSignUp() {
  const fetcher = (input: MutationSignupInput) =>
    api.postResponse({
      url: API_ENDPOINTS.LOCAL.AUTH.SIGNUP,
      body: input,
    });

  const mutation = useMutation<
    StoryApi<string | boolean>,
    StoryErrorApi<string | null>,
    MutationSignupInput
  >(fetcher, {
    mutationKey: API_ENDPOINTS.LOCAL.AUTH.SIGNUP,
  });

  return mutation;
}
