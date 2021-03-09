import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/blur-up/ls.blur-up';

import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import { HelmetProvider } from 'react-helmet-async';

import { wrapper } from '~/store/configure';
import Core from '~/containers/base/Core';

function AppPage({ Component, pageProps }: AppProps) {
  return (
    <>
      <HelmetProvider>
        <Component {...pageProps} />
        <Core />
      </HelmetProvider>
    </>
  );
}

AppPage.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<AppInitialProps> => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = (await Component.getInitialProps(ctx)) || {};
  }

  return { pageProps };
};

export default wrapper.withRedux(AppPage);
