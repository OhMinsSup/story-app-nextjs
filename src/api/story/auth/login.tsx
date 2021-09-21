import { useMutation } from "react-query";
import { AxiosError } from "axios";

// api
import { api } from "@api/module";

// no components
import { API_ENDPOINTS } from "@constants/constant";
import { isAxiosError } from "@utils/utils";

// hooks
import { useToken, useUserInfo } from "@hooks/useStorage";

// store
import useAuth from "@store/useAuth";
import useWalletSignature from "@store/useWalletSignature";

// types
import type {
  MutationLoginInput,
  MutationLoginResponse,
  ResponseModel,
  StoryApi,
} from "types/story-api";

export function useMutationLogin() {
  const { setAuth } = useAuth();
  const { setWalletSignature } = useWalletSignature();
  const [, setUserInfo] = useUserInfo();
  const [, setToken] = useToken();

  return useMutation<
    StoryApi<MutationLoginResponse>,
    AxiosError<ResponseModel<{ signatureId: number; signature: string }>>,
    MutationLoginInput
  >(
    (input) => {
      return api.postResponse({
        url: API_ENDPOINTS.LOCAL.AUTH.LOGIN,
        body: input,
      });
    },
    {
      onSuccess: (data) => {
        if (data?.data.payload) {
          const { payload: { id, email, profile, accessToken } } = data?.data;

          const user = {
            id,
            email,
            profile,
          };

          setToken(accessToken);
          setUserInfo(user);
          setAuth(user);
        }
      },
      onError: (error, variables) => {
        if (!isAxiosError(error)) return;
        const { response } = error;
        switch (response?.status) {
          // 회원이 존재하지 않는 경우 회원가입 페이지 이동
          case 404: {
            const { payload } = response.data;
            setWalletSignature({
              walletAddress: variables.walletAddress,
              signature: payload.signature,
              signatureId: payload.signatureId,
            });
            break;
          }
          default:
            break;
        }
      },
    },
  );
}
