import '@assets/main.css';
import 'swiper/css';

import React, { useEffect, useRef } from 'react';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

// components
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey, red, blue } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import Core from '@components/common/Core';
import SeoHead from '@components/common/SEO';

// type
import type { AppProps } from 'next/app';
import type { StoryApi } from '@api/schema/story-api';

// store
import Provider from '@contexts/provider';
import { useCreateStore, useStore, ZustandProvider } from '@store/store';

// utils
import { isAxiosError } from '@utils/utils';
import { hydrateFirebase } from '@libs/state/firebase-manager/firebase-manager';
import { IS_DEPLOY_GROUP_PROD, IS_PROD, SENTRY_DSN } from '@constants/env';
import { STATUS_CODE, STORAGE_KEY } from '@constants/constant';

// hooks
import { useIsomorphicLayoutEffect } from 'react-use';
import { useErrorContext } from '@contexts/error/context';

// api
import { api } from '@api/module';
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
  const { setError } = useErrorContext();
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
          refetchOnWindowFocus: false,
          onSuccess: (data: unknown) => {
            const typeSafeData = data as StoryApi;
            if (
              typeof typeSafeData.data === 'object' &&
              typeSafeData.data &&
              !typeSafeData.data.ok
            ) {
              setError(typeSafeData.data);
            } else {
              setError(undefined);
            }
          },
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
        setLoggedIn?.(!!value);
      }
    };
    promises();
  }, [isLoggedIn]);

  return (
    <QueryClientProvider client={queryClientRef.current as QueryClient}>
      <Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>
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
        <Provider>
          <ClientProvider pageProps={pageProps}>{children}</ClientProvider>
        </Provider>
      </ThemeProvider>
    </ZustandProvider>
  );
};

const AppPage = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout || Noop;
  const ErrorBoundary = (Component as any).ErrorBoundary || Noop;

  useEffect(() => {
    hydrateFirebase();
  }, []);

  return (
    <>
      <SeoHead />
      <RootProvider pageProps={pageProps}>
        <ErrorBoundary>
          <Core>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Core>
        </ErrorBoundary>
      </RootProvider>
    </>
  );
};

export default AppPage;
