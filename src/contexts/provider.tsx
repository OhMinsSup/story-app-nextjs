import React from 'react';
import { ErrorProvider } from './error/context';
import { NotificationProvider } from './notification/context';

const Provider: React.FC = ({ children }) => {
  return (
    <ErrorProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </ErrorProvider>
  );
};

export default Provider;
