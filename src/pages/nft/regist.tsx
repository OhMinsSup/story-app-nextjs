import React from 'react';

// components
import { Title, Text } from '@mantine/core';
import { NFTsForm } from '@components/nft';
import { Layout } from '@components/ui/Layout';
import { NFTsRegisterSeo } from '@components/ui/SEO';
import { ModalsProvider } from '@mantine/modals';

function NFTsRegisterPage() {
  return (
    <div className="col-span-12 xl:col-span-10 xl:col-start-2 2xl:col-start-3 2xl:col-span-6">
      <Title order={1} className="mb-4 px-2">
        Create New Item
        <Text size="sm" color="dimmed">
          You can set preferred display name, create your profile URL and manage
          other personal settings.
        </Text>
      </Title>
      <div className="w-full px-4 sm:px-2 mb-6">
        <NFTsForm />
      </div>
    </div>
  );
}

export default NFTsRegisterPage;

NFTsRegisterPage.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      <NFTsRegisterSeo />
      <ModalsProvider>
        <div
          className="container grid grid-cols-12 mx-auto 2xl:grid-cols-10 2xl:px-5 md:h-full"
          style={{
            paddingTop: 'calc(var(--mantine-header-height, 0px) + 16px)',
            paddingBottom: 'calc(var(--mantine-footer-height, 0px) + 16px)',
          }}
        >
          {page}
        </div>
      </ModalsProvider>
    </Layout>
  );
};
