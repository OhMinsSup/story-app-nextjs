// hooks
import { useMutation, useQueryClient } from '@tanstack/react-query';

// api
import { api } from '@api/module';

// atoms
import { useSetAtom } from 'jotai';
// import { userAtom } from '@atoms/userAtom';
import { authAtom } from '@atoms/authAtom';

const postLogout = () => api.logout();

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  // const setUserAtom = useSetAtom(userAtom);
  const setAuthAtom = useSetAtom(authAtom);

  return useMutation(postLogout, {
    onSuccess: () => {
      // setUserAtom(null);
      setAuthAtom(false);
      queryClient.clear();
    },
  });
}
