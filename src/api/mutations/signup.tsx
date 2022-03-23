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

const fetchPostSignup = async (body: SignupInput) => {
  return api.post({
    url: API_ENDPOINTS.LOCAL.AUTH.SIGNUP,
    body,
  });
};

export function useSignupMutation() {
  const res = useMutation<
    StoryApi<string | boolean>,
    StoryErrorApi,
    SignupInput
  >(fetchPostSignup);

  return {
    ...res,
    fetchPostSignup,
  };
}
