import '@assets/main.css';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-get-file/dist/filepond-plugin-get-file.min.css';

import React, { useRef, useEffect } from 'react';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

// components
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { blueGrey, grey, red } from '@mui/material/colors';
import Core from '@components/common/Core';

// type
import type { AppProps } from 'next/app';

// store
import { useCreateStore, ZustandProvider } from '@store/store';
import SeoHead from '@components/common/SEO';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      main: blueGrey[700],
    },
    error: {
      main: red.A400,
    },
  },
});

const Noop: React.FC = ({ children }) => <>{children}</>;

const start = (url: string) => {
  NProgress.start();
};

const done = () => {
  NProgress.done();
};

Router.events.on('routeChangeStart', start);
Router.events.on('routeChangeComplete', done);
Router.events.on('routeChangeError', done);

const AppPage = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout || Noop;
  const queryClientRef = useRef<QueryClient | null>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const createStore = useCreateStore(pageProps.initialZustandState);

  return (
    <>
      <SeoHead />
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ZustandProvider createStore={createStore}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <Core />
            </ThemeProvider>
          </ZustandProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default AppPage;
