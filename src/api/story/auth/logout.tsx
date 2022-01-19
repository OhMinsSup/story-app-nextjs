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
  api.post({
    url: API_ENDPOINTS.LOCAL.AUTH.LOGOUT,
  });

export function useMutationLogout() {
  const { setAuth, setLoggedIn } = useStore(
    ({ actions }) => ({
      setAuth: actions?.setAuth,
      setLoggedIn: actions?.setLoggedIn,
    }),
    shallow,
  );

  const onSuccess = () => {
    setLoggedIn?.(false);
    setAuth?.(null);
  };

  const mutation = useMutation<StoryApi, StoryErrorApi>(fetcherLogout, {
    onSuccess,
  });

  return mutation;
}
