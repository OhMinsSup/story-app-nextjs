import { useMutation } from 'react-query';
import shallow from 'zustand/shallow';

// api
import { api } from '@api/module';

// no components
import { API_ENDPOINTS } from '@constants/constant';

// store
import { useStore } from '@store/store';

// types
import type { StoryErrorApi, StoryApi } from '@api/schema/story-api';

const fetcherLogout = () =>
  api.postResponse({
    url: API_ENDPOINTS.LOCAL.AUTH.LOGOUT,
  });

export function useMutationLogout() {
  const { setAuth } = useStore(
    ({ actions }) => ({
      setAuth: actions?.setAuth,
    }),
    shallow,
  );

  const mutation = useMutation<StoryApi, StoryErrorApi>(fetcherLogout, {
    onSuccess: () => {
      setAuth?.(null);
    },
  });

  return mutation;
}
