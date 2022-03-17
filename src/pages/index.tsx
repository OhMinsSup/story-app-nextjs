import Header from '@components/ui/Header/Header';
import { Sidebar } from '@components/ui/Sidebar';
import { AppShell } from '@mantine/core';

import React from 'react';

const IndexPage = () => {
  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={<Sidebar />}
      header={<Header />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {/* Your application here */}
    </AppShell>
  );
};

export default IndexPage;
