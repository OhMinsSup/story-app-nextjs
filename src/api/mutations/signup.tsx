// hooks
import { useMutation } from 'react-query';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS } from '@constants/constant';

// types
import type {
  SignupInput,
  StoryErrorApi,
  StoryApi,
} from '@api/schema/story-api';

const postSignup = (body: SignupInput) =>
  api.post({
    url: API_ENDPOINTS.LOCAL.AUTH.SIGNUP,
    body,
  });

export function useSignupMutation() {
  const mutation = useMutation<
    StoryApi<string | boolean>,
    StoryErrorApi,
    SignupInput
  >(postSignup);

  return {
    ...mutation,
    postSignup,
  };
}
