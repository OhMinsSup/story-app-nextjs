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
      <ClientProvider>
        <NftForm />
      </ClientProvider>
    </AppShell>
  );
};

export default NftRegistPage;
