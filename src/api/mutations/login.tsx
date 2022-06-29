// hooks
import { useMutation } from 'react-query';

// api
import { api } from '@api/module';

// constants
import { API_ENDPOINTS } from '@constants/constant';

// types
import type {
  LoginInput,
  LoginSchema,
  StoryErrorApi,
  StoryApi,
} from '@api/schema/story-api';
import { useAtom } from 'jotai';
import { asyncWriteOnlyUserAtom } from '@atoms/userAtom';

const postLogin = (body: LoginInput) =>
  api.post({
    url: API_ENDPOINTS.LOCAL.AUTH.LOGIN,
    body,
  });

export function useLoginMutation() {
  const [, update] = useAtom(asyncWriteOnlyUserAtom);

  const mutation = useMutation<
    StoryApi<LoginSchema>,
    StoryErrorApi,
    LoginInput
  >(postLogin, {
    onSuccess: () => update(),
  });

  return {
    ...mutation,
    postLogin,
  };
}
