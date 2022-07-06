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

// atom
import { asyncWriteOnlyUserAtom } from '@atoms/userAtom';
import { ApiError } from '@libs/error';

export const postLogin = (body: LoginInput) =>
  api.post({
    url: API_ENDPOINTS.LOCAL.AUTH.LOGIN,
    body,
  });

export function useLoginMutation() {
  const [, update] = useAtom(asyncWriteOnlyUserAtom);

  const config = useMutation<StoryApi<LoginSchema>, StoryErrorApi, LoginInput>(
    postLogin,
    {
      onSuccess: () => {
        update();
      },
    },
  );

  const trigger = async (input: LoginInput) => {
    try {
      await config.mutateAsync(input);
    } catch (error) {
      if (ApiError.isApiError(error)) {
        const { message } = error.toApiErrorJSON();
        // switch (message?.resultCode) {
        //   case RESULT_CODE.INCORRECT_PASSWORD: {
        //     msg = '비밀번호가 일치하지 않습니다.';
        //     break;
        //   }
        //   case RESULT_CODE.NOT_EXIST: {
        //     msg = '존재하지 않는 사용자입니다.';
        //     break;
        //   }
        // }
        console.log(message);
        return;
      }
      throw error;
    }
  };

  return {
    trigger,
    ...config,
  };
}
