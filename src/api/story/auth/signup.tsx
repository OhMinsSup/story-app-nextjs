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
  return useMutation<
    StoryApi<string | boolean>,
    StoryErrorApi<string | null>,
    MutationSignupInput
  >(
    (input) =>
      api.postResponse({
        url: API_ENDPOINTS.LOCAL.AUTH.SIGNUP,
        body: input,
      }),
    {
      mutationKey: 'signup',
    },
  );
}
