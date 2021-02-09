import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import system from '~/store/modules/system';

function useHeader() {
  const dispatch = useDispatch();

  const onLoginClick = useCallback(() => {
    dispatch(system.actions.showAuthModal());
  }, [dispatch]);

  return { onLoginClick };
}

export default useHeader;
