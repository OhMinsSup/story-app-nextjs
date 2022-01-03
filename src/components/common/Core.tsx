import React from 'react';
import { useMeQuery } from '@api/story/user';

const Core: React.FC = ({ children }) => {
  const { userInfo } = useMeQuery();

  console.log(`%c🐳 userInfo:`, 'color: #66aee9;', userInfo);

  return <>{children}</>;
};

export default Core;
