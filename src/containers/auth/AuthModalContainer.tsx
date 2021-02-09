import React, { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AuthModal from '~/components/auth/AuthModal';
import { RootState } from '~/store/modules';
import system from '~/store/modules/system';

interface AuthModalContainerProps {}
function AuthModalContainer(_: AuthModalContainerProps) {
  const dispatch = useDispatch();

  const visible = useSelector<RootState, boolean>(
    ({ system }) => system.auth.visible,
    shallowEqual
  );

  const onClose = useCallback(() => {
    dispatch(system.actions.closeAuthModal());
  }, [dispatch]);

  return (
    <AuthModal visible={visible} onClose={onClose}>
      ???
    </AuthModal>
  );
}

export default AuthModalContainer;
