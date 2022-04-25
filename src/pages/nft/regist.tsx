import React from 'react';

// components
import { AppShell } from '@mantine/core';
import { Header } from '@components/ui/Header';
import { NftForm } from '@components/nft';

// hooks
import { ClientProvider } from '@components/nft/context/client';

const NftRegistPage = () => {
  return (
    <AppShell
      padding="md"
      header={<Header />}
      styles={(theme) => ({
        main: {
          paddingLeft: 0,
          paddingRight: 0,
          paddingBottom: 0,
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[9] : undefined,
        },
      })}
    >
      <ClientProvider>
        <NftForm />
      </ClientProvider>
    </AppShell>
  );
};

export default NftRegistPage;
