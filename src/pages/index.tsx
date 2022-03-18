import { Header } from '@components/ui/Header';
import { Sidebar } from '@components/ui/Sidebar';
import { AppShell } from '@mantine/core';

// hooks
import { useMediaQuery } from '@mantine/hooks';

import React from 'react';

const IndexPage = () => {
  const smallScreen = useMediaQuery('(max-width: 768px)');
  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={smallScreen ? undefined : <Sidebar />}
      header={<Header />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : undefined,
        },
      })}
    >
      {/* Your application here */}
      Hello
    </AppShell>
  );
};

export default IndexPage;
