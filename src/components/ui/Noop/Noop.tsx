import React from 'react';

const Noop: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <>{children}</>
);

export default Noop;
