import React from 'react';
import Navbar from '@components/ui/layouts/Navbar';

interface AppLayoutProps {}
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AppLayout;
