import React from 'react';
import { useMeQuery } from '@api/story/user';

const Core: React.FC = () => {
  const { userInfo } = useMeQuery();

  console.log(`%c🐳 userInfo:`, 'color: #66aee9;', userInfo);

  return null;
};

export default Core;
