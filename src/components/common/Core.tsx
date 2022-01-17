import React, { useEffect } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import { useMeQuery } from '@api/story/user';
import { useErrorContext } from '@contexts/error/context';
// import { useNotificationContext } from '@contexts/notification/context';

// hoos
import { useAlert } from '@hooks/useAlert';
// import { isBrowser } from '@utils/utils';

const Core: React.FC = ({ children }) => {
  const { userInfo } = useMeQuery();
  const { message } = useErrorContext();
  const { showAlert, Alert } = useAlert();
  // const { notification } = useNotificationContext();

  useEffect(() => {
    if (message) {
      showAlert({
        content: {
          text: message,
        },
      });
    }
  }, [message, showAlert]);

  // 알림 설정을 한 경우 subcribe 설정
  // useIsomorphicLayoutEffect(() => {
  //   if (userInfo && notification) {
  //     const {
  //       profile: { canNotification },
  //     } = userInfo;
  //     if (isBrowser && 'Notification' in window && canNotification) {
  //       Notification.requestPermission((status) => {
  //         if (status === 'granted') {
  //           notification.subscribe();
  //         }
  //       });
  //     }
  //   }
  // }, [userInfo, notification]);

  console.log(`%c🐳 [Core - userInfo]:`, 'color: #66aee9;', userInfo);

  return (
    <>
      {children}
      <Alert />
    </>
  );
};

export default Core;
