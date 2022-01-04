import React, { useEffect } from 'react';
import { useMeQuery } from '@api/story/user';
import { useErrorContext } from '@contexts/error/context';
import { useAlert } from '@hooks/useAlert';

const Core: React.FC = ({ children }) => {
  const { userInfo } = useMeQuery();
  const { message } = useErrorContext();
  const { showAlert, Alert } = useAlert();

  useEffect(() => {
    if (message) {
      showAlert({
        content: {
          text: message,
        },
      });
    }
  }, [message, showAlert]);

  console.log(`%c🐳 userInfo:`, 'color: #66aee9;', userInfo);

  return (
    <>
      {children}
      <Alert />
    </>
  );
};

export default Core;
