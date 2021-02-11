import React, { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import AuthForm from '~/components/auth/AuthForm';
import AuthModal from '~/components/auth/AuthModal';

import useSendEmailHook from '~/api/auth/auth.hook';
import { RootState } from '~/store/modules';
import system from '~/store/modules/system';

interface AuthModalContainerProps {}
function AuthModalContainer(_: AuthModalContainerProps) {
  const dispatch = useDispatch();

  const [_sendAuthEmail, , data, , resetSendAuthEmail] = useSendEmailHook();

  const visible = useSelector<RootState, boolean>(
    ({ system }) => system.auth.visible,
    shallowEqual
  );

  const registered = data && data.data.registered;

  const onClose = useCallback(() => {
    dispatch(system.actions.closeAuthModal());
    resetSendAuthEmail();
  }, [dispatch, resetSendAuthEmail]);

  const onSendAuthEmail = useCallback(
    async (email: string) => {
      _sendAuthEmail(email);
    },
    [_sendAuthEmail]
  );

  return (
    <AuthModal visible={visible} onClose={onClose}>
      <AuthForm
        onSendAuthEmail={onSendAuthEmail}
        loading={false}
        registered={registered}
        currentPath=""
      />
    </AuthModal>
  );
}

export default AuthModalContainer;
