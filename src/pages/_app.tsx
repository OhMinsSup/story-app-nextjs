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
import { useCreateStore, useStore, ZustandProvider } from '@store/store';
import Provider from '@contexts/provider';
import { IS_DEPLOY_GROUP_PROD, IS_PROD, SENTRY_DSN } from '@constants/env';
import { isAxiosError } from '@utils/utils';
import { STATUS_CODE, STORAGE_KEY } from '@constants/constant';
import { api } from '@api/module';
import { useIsomorphicLayoutEffect } from 'react-use';
import { StoryStorage } from '@libs/storage';

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

const ClientProvider: React.FC<{ pageProps: any }> = ({
  pageProps,
  children,
}) => {
  const { setAuth, setLoggedIn, isLoggedIn } = useStore((store) => ({
    isLoggedIn: store.isLoggedIn,
    setAuth: store.actions?.setAuth,
    setLoggedIn: store.actions?.setLoggedIn,
  }));
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          retryOnMount: false,
          // useErrorBoundary: true,
          onError: async (error) => {
            if (isAxiosError(error)) {
              const { status } = error.response;
              switch (status) {
                case STATUS_CODE.UNAUTHORIZED:
                  await StoryStorage.removeItem(STORAGE_KEY.IS_LOGGED_IN_KEY);
                  await api.logout().then(() => {
                    setAuth?.(null);
                    setLoggedIn?.(false);
                  });
                  break;
                default:
                  break;
              }
            }
          },
        },
      },
    });
  }

  useIsomorphicLayoutEffect(() => {
    const promises = async () => {
      if (!isLoggedIn) {
        const value: boolean = await StoryStorage.getItem(
          STORAGE_KEY.IS_LOGGED_IN_KEY,
        );
        setLoggedIn?.(value);
      }
    };
    promises();
  }, [isLoggedIn]);

  return (
    <QueryClientProvider client={queryClientRef.current as QueryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider>{children}</Provider>
      </Hydrate>
    </QueryClientProvider>
  );
};

const RootProvider: React.FC<{ pageProps: any }> = ({
  pageProps,
  children,
}) => {
  const createStore = useCreateStore(pageProps.initialZustandState);

  return (
    <ZustandProvider createStore={createStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ClientProvider pageProps={pageProps}>{children}</ClientProvider>
      </ThemeProvider>
    </ZustandProvider>
  );
};

const AppPage = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout || Noop;

  return (
    <>
      <SeoHead />
      <RootProvider pageProps={pageProps}>
        <Core>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Core>
      </RootProvider>
    </>
  );
};

export default AppPage;
