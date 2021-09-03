import { useMutation } from "react-query";
import { AxiosError } from "axios";

import { api } from "@api/module";
import { API_ENDPOINTS } from "@constants/constant";
import { useToken, useUserInfo } from "@hooks/useStorage";
import useAuth from "@store/useAuth";
import {
  MutationLoginInput,
  MutationLoginResponse,
  StoryApi,
} from "types/story-api";

export function useMutationLogin() {
  const { setAuth } = useAuth();
  const [_, setUserInfo] = useUserInfo();
  const [__, setToken] = useToken();

  return useMutation<
    StoryApi<MutationLoginResponse | null>,
    AxiosError<StoryApi<null>>,
    MutationLoginInput
  >(
    (input) => {
      return api.postResponse({
        url: API_ENDPOINTS.LOCAL.AUTH.LOGIN,
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
