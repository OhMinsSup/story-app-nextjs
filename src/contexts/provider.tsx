import React from 'react';
import { UploadProvider } from './upload/context';

const Provider: React.FC = ({ children }) => {
  return <UploadProvider>{children}</UploadProvider>;
};

export default Provider;
