import React from 'react';
import { Header } from '@components/ui/Header';
import { AppShell } from '@mantine/core';

const NftRegistPage = () => {
  return (
    <AppShell
      padding="md"
      className="h-full"
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
      ??
    </AppShell>
  );
};

export default NftRegistPage;
