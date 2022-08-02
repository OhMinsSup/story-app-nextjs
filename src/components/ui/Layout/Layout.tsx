import React from 'react';
import { AppShell, type AppShellProps } from '@mantine/core';
import { Header } from './_components';

interface ShellProps
  extends AppShellProps,
    React.RefAttributes<HTMLDivElement> {}

interface LayoutProps extends ShellProps {}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  children,
  ...props
}) => {
  const {
    header = <Header />,
    styles = () => ({
      body: {
        height: '100%',
      },
      main: {
        padding: 0,
      },
    }),
  } = props || {};

  return (
    <AppShell padding="md" className="h-full" header={header} styles={styles}>
      {children}
    </AppShell>
  );
};

export default Layout;
