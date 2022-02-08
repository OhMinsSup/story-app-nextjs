import React from 'react';
import { useMeQuery } from '@api/story/user';

const Core: React.FC = ({ children }) => {
  useMeQuery();

  return <>{children}</>;
};

export default Core;
