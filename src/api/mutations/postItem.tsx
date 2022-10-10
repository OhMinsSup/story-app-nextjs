// hooks
import { useMutation } from '@tanstack/react-query';
import { useMethods } from 'react-use';

// api
import { api } from '@api/module';
import { isEmpty } from '@utils/assertion';

// error
import { ApiError } from '@libs/error';

// constants
import { API_ENDPOINTS } from '@constants/constant';

// types
import type { ErrorApi } from '@api/schema/story-api';
import type { ItemBody } from '@api/schema/body';
import type { DataIdResp, DataIdRespSchema } from '@api/schema/resp';

interface ErrorState {
  message: string;
}

const initialState: ErrorState = {
  message: '',
};

function createMethods(state: ErrorState) {
  return {
    reset() {
      return initialState;
    },
    setErrorMessage(message: string) {
      return {
        ...state,
        message,
      };
    },
  };
}

const postItemApi = async (body: ItemBody) => {
  const resp = await api.post<DataIdRespSchema>({
    url: API_ENDPOINTS.APP.ITEM.ROOT,
    body,
  });
  return resp;
};

interface Options {
  onSuccess: (data: DataIdRespSchema) => void;
}

export function useItemMutation(opts?: Options) {
  const [state, methods] = useMethods<
    ReturnType<typeof createMethods>,
    ErrorState
  >(createMethods, initialState);

  const resp = useMutation<DataIdResp, ErrorApi, ItemBody>(postItemApi, {
    onMutate() {
      methods.reset();
    },
    onSuccess(data) {
      const result = data.data?.result;
      if (isEmpty(result) || !result) return;
      opts?.onSuccess?.(result);
    },
    onError(error) {
      if (ApiError.isAxiosError(error)) {
        methods.setErrorMessage('에러가 발생했습니다.\n다시 시도해주세요.');
        return;
      }
    },
  });

  return {
    ...resp,
    get fetcher() {
      return postItemApi;
    },
    get state() {
      return state;
    },
    get method() {
      return methods;
    },
  };
}
