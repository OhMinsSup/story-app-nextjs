import shallow from 'zustand/shallow';
import { useStore } from './store';

const useAuth = () => {
  return useStore(
    (store) => ({
      userInfo: store.userInfo,
      setAuth: store.actions.setAuth,
    }),
    shallow,
  );
};

export default useAuth;
