// hooks
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

// api
import { api } from '@api/module';
import { globalClient } from '@api/client';

// atoms
import { authAtom } from '@atoms/authAtom';

const postLogoutApi = () => api.logout();

export function useLogoutMutation() {
  // const setUserAtom = useSetAtom(userAtom);
  const setAuthAtom = useSetAtom(authAtom);

  const resp = useMutation(postLogoutApi, {
    onSuccess: () => {
      setAuthAtom(false);
      globalClient.clear();
    },
  });

  return {
    ...resp,
    get fetcher() {
      return postLogoutApi;
    },
  };
}
