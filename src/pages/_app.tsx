import '@assets/main.css';

import React from 'react';
import type { AppProps } from 'next/app';

const Noop: React.FC = ({ children }) => <>{children}</>;

const AppPage = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout || Noop;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default AppPage;
