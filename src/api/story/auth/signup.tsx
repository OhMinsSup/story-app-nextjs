import { useMutation } from 'react-query';

// api
import { api } from '@api/module';

// contatns
import { API_ENDPOINTS } from '@constants/constant';

import type { SignupInput, StoryApi, StoryErrorApi } from 'types/story-api';

const fetcher = (input: SignupInput) =>
  api.postResponse({
    url: API_ENDPOINTS.LOCAL.AUTH.SIGNUP,
    body: input,
  });

export function useMutationSignUp() {
  const mutation = useMutation<
    StoryApi<string | boolean>,
    StoryErrorApi<string | null>,
    SignupInput
  >(fetcher, {
    mutationKey: API_ENDPOINTS.LOCAL.AUTH.SIGNUP,
  });

  return mutation;
}
