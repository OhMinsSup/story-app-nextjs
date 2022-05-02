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
      styles={(theme) => ({
        body: {
          height: '100%',
        },
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[9] : undefined,
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
