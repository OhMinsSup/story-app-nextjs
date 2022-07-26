import React from 'react';

// components
import { Title } from '@mantine/core';
import { Form } from '@components/nft';
import { Layout } from '@components/ui/Layout';
import { NFTsRegisterSeo } from '@components/ui/Seo';
import { ModalsProvider } from '@mantine/modals';

const NFTsRegisterPage = () => {
  return (
    <Layout>
      <NFTsRegisterSeo />
      <ModalsProvider>
        <div className="container grid grid-cols-12 mx-auto 2xl:grid-cols-10 2xl:px-5 md:h-full">
          <div className="col-span-12 xl:col-span-10 xl:col-start-2 2xl:col-start-3 2xl:col-span-6">
            <Title order={1} className="mb-4 px-2">
              Create New Item
            </Title>
            <div className="w-full px-4 sm:px-2 mb-6">
              <Form />
            </div>
          </div>
        </div>
      </ModalsProvider>
    </Layout>
  );
};

export default NFTsRegisterPage;
