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
      main: {
        padding: 0,
        minHeight: '100%',
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

export const createGetLayout = (
  layoutProps?: LayoutProps,
): ((page: React.ReactElement) => React.ReactNode) => {
  return function getLayout(page: React.ReactElement) {
    return <Layout {...layoutProps}>{page}</Layout>;
  };
};
