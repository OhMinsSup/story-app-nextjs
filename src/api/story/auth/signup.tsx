import { useMutation } from "react-query";
import { AxiosError } from "axios";

import { api } from "@api/module";
import { API_ENDPOINTS } from "@constants/constant";
import { useToken, useUserInfo } from "@hooks/useStorage";
import useAuth from "@store/useAuth";
import {
  MutationSignupInput,
  MutationSignupResponse,
  StoryApi,
} from "types/story-api";

export function useMutationSignUp() {
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
      onSuccess: (data, variables, context) => {
        if (data?.data.payload) {
          const { payload } = data?.data;

          const user = {
            id: payload.id,
            email: payload.email,
            nickname: payload.profile.nickname,
            profileUrl: payload.profile.profileUrl,
          };

          setToken(payload.accessToken);
          setUserInfo(user);
          setAuth(user);
        }
      },
    },
  );
}
