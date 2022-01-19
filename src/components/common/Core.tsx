import React from 'react';
import { useMeQuery } from '@api/story/user';
// import { useNotificationContext } from '@contexts/notification/context';

// hoos
// import { isBrowser } from '@utils/utils';

const Core: React.FC = ({ children }) => {
  const { userInfo } = useMeQuery();
  // const { notification } = useNotificationContext();

  console.log(`%c🐳 [Core - userInfo]:`, 'color: #66aee9;', userInfo);

  return <>{children}</>;
};

export default Core;
