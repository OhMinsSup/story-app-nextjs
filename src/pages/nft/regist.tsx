import React from 'react';

// components
import { NftForm } from '@components/nft';

// hooks
import { ModuleProvider } from '@components/nft/context/context';
import { Layout } from '@components/ui/Layout';

const NftRegistPage = () => {
  return (
    <Layout>
      <ModuleProvider>
        <NftForm />
      </ModuleProvider>
    </Layout>
  );
};

export default NftRegistPage;
