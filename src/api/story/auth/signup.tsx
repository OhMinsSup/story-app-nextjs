import { useMutation } from 'react-query';
import { AxiosError } from 'axios';

// api
import { api } from '@api/module';

// no compoents
import { API_ENDPOINTS } from '@constants/constant';

// hooks
import { useToken, useUserInfo } from '@hooks/useStorage';

// store
import useAuth from '@store/useAuth';
import useWalletSignature from '@store/useWalletSignature';

import {
  MutationSignupInput,
  MutationSignupResponse,
  StoryApi,
} from 'types/story-api';

export function useMutationSignUp() {
  const { setWalletSignature } = useWalletSignature();
  const { setAuth } = useAuth();
  const [, setUserInfo] = useUserInfo();
  const [, setToken] = useToken();

  return useMutation<
    StoryApi<MutationSignupResponse | null>,
    AxiosError<StoryApi<null>>,
    MutationSignupInput
  >(
    (input) => {
      return api.postResponse({
        url: API_ENDPOINTS.LOCAL.AUTH.SIGNUP,
        body: input,
      });
    },
    {
      onSuccess: (data) => {
        if (data?.data.payload) {
          const {
            payload: { id, email, profile, accessToken },
          } = data?.data;

          const user = {
            id,
            email,
            profile,
          };

          setToken(accessToken);
          setUserInfo(user);
          setAuth(user);
          setWalletSignature(null);
        }
      },
    },
  );
}
