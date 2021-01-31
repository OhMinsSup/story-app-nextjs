import '../../global.css';

import React from 'react';
import App, { AppContext, AppProps } from 'next/app';
import { HelmetProvider } from 'react-helmet-async';
import { wrapper, AppStore } from '~/store/configure';

interface Props extends AppProps {
  store: AppStore;
}

class AppPage extends App<Props> {
  static async getInitialProps(context: AppContext) {
    const { ctx, Component } = context;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = (await Component.getInitialProps(ctx)) || {};
    }
    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <HelmetProvider>
          <Component {...pageProps} />
        </HelmetProvider>
      </>
    );
  }
}
export default wrapper.withRedux(AppPage);
