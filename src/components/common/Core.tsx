import React from 'react';
import { useMeQuery } from '@api/story/user';

const Core: React.FC = () => {
  useMeQuery();

  return null;
};

export default Core;
