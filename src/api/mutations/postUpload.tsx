// hooks
import { useMutation } from 'react-query';
import { useMethods } from 'react-use';

// api
import { api } from '@api/module';

// constants
import { PAGE_ENDPOINTS } from '@constants/constant';

// error
import { ApiError } from '@libs/error';

// types
import type {
  ErrorApi,
  FileUploadParams,
  UploadApi,
  FileSchema,
} from '@api/schema/story-api';

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

const postUpload = (body: FileUploadParams) =>
  api.upload({
    file: body.file,
    storyType: body.storyType,
  });

interface Options {
  onSuccess: (data: FileSchema) => void;
}

export function useUploadMutation(opts?: Options) {
  const [state, methods] = useMethods<
    ReturnType<typeof createMethods>,
    ErrorState
  >(createMethods, initialState);

  const resp = useMutation<UploadApi, ErrorApi, FileUploadParams>(postUpload, {
    onMutate() {
      methods.reset();
    },
    onSuccess(data) {
      const { ok, result } = data.data;
      if (!ok) return;
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
      return postUpload;
    },
    get state() {
      return state;
    },
    get method() {
      return methods;
    },
  };
}
