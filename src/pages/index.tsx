import React from 'react';

import { Layout } from '@components/ui/Layout';
import { Home } from '@components/home';

// types
import type { GetServerSidePropsContext } from 'next';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {},
  };
};

const IndexPage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default IndexPage;
