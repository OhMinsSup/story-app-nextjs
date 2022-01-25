import React from 'react';
import { ErrorProvider } from './error/context';

const Provider: React.FC = ({ children }) => {
  return <ErrorProvider>{children}</ErrorProvider>;
};

export default Provider;
