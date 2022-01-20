import '@assets/main.css';
import 'swiper/css';

import React, { useRef } from 'react';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

// components
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { blueGrey, red, blue } from '@mui/material/colors';
import Core from '@components/common/Core';
import SeoHead from '@components/common/SEO';

// type
import type { AppProps } from 'next/app';

// store
import { useCreateStore, ZustandProvider } from '@store/store';
import Provider from '@contexts/provider';
import { IS_DEPLOY_GROUP_PROD, IS_PROD, SENTRY_DSN } from '@constants/env';

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

Sentry.init({
  enabled: [SENTRY_DSN, IS_PROD, IS_DEPLOY_GROUP_PROD].every(Boolean),
  dsn: SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const AppPage = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout || Noop;
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          retryOnMount: false,
          useErrorBoundary: true,
          onError: (error) => {
            console.log(error);
          },
        },
      },
    });
  }

  const createStore = useCreateStore(pageProps.initialZustandState);

  const WrapperProvider: React.FC = ({ children }) => {
    return (
      <>
        <QueryClientProvider client={queryClientRef.current as QueryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ZustandProvider createStore={createStore}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Provider>{children}</Provider>
              </ThemeProvider>
            </ZustandProvider>
          </Hydrate>
        </QueryClientProvider>
      </>
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
