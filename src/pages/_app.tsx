import '@assets/main.css';
import 'swiper/css';

import React, { useRef } from 'react';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

// components
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { blueGrey, red, blue } from '@mui/material/colors';
import Core from '@components/common/Core';

// type
import type { AppProps } from 'next/app';

// store
import { useCreateStore, ZustandProvider } from '@store/store';
import SeoHead from '@components/common/SEO';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[600],
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

const start = () => {
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
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const createStore = useCreateStore(pageProps.initialZustandState);

  const WrapperProvider: React.FC = ({ children }) => {
    return (
      <QueryClientProvider client={queryClientRef.current as QueryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ZustandProvider createStore={createStore}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </ZustandProvider>
        </Hydrate>
      </QueryClientProvider>
    );
  };

  return (
    <>
      <SeoHead />
      <WrapperProvider>
        <Core>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Core>
      </WrapperProvider>
    </>
  );
};

export default AppPage;
