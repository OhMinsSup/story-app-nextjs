import React from 'react';
import { AppShell } from '@mantine/core';
import { Header } from '@components/ui/Header';

interface LayoutProps {}
const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  children,
}) => {
  return (
    <AppShell
      padding="md"
      className="h-full"
      navbarOffsetBreakpoint="sm"
      header={<Header />}
      styles={() => ({
        body: {
          height: '100%',
        },
        main: {
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
