import '@assets/main.css';
import 'swiper/css';

import React, { useEffect } from 'react';

// components
import { Core } from '@components/ui/Core';
import { MantineProvider } from '@mantine/core';
import { Noop } from '@components/ui/Noop';
import { Provider } from '@contexts/index';
import { SEO } from '@components/ui/SEO';

// type
import type { AppProps } from 'next/app';

// store
import { useCreateStore, ZustandProvider } from '@store/store';
import {
  useAsyncFn,
  useIsomorphicLayoutEffect,
  usePermission,
} from 'react-use';

// utils
import { hydrateFirebase } from '@libs/firebase-manager/firebase-manager';
import { isEmpty } from '@utils/assertion';

const AppPage = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout || Noop;
  const ErrorBoundary = (Component as any).ErrorBoundary || Noop;

  const permission = usePermission({ name: 'notifications' });

  const createStore = useCreateStore(pageProps.initialZustandState);

  const [firebase, doFetch] = useAsyncFn(async () => {
    const firebase = await hydrateFirebase();
    return firebase;
  }, []);

  useIsomorphicLayoutEffect(() => {
    doFetch();
  }, []);

  useEffect(() => {
    if (permission === 'granted' && firebase.value) {
      if (isEmpty(firebase.value?.messaging)) {
        firebase.value?.setMessaging();
        const messaging = firebase.value?.messaging;
        if (messaging) {
          firebase.value?.forgroundMessaging(messaging);
          firebase.value?.intializeMessaging(messaging);
        }
      }
    }
  }, [permission, firebase.value]);

  return (
    <>
      <SEO />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: 'Verdana, sans-serif',
          fontFamilyMonospace: 'Monaco, Courier, monospace',
          // colorScheme: 'light',
          colorScheme: 'dark',
          colors: {
            // override dark colors to change them for all components
            dark: [
              '#d5d7e0',
              '#acaebf',
              '#8c8fa3',
              '#666980',
              '#4d4f66',
              '#34354a',
              '#2b2c3d',
              '#1d1e30',
              '#0c0d21',
              '#01010a',
            ],
            brand: [
              '#EDF2FF',
              '#DBE4FF',
              '#BAC8FF',
              '#91A7FF',
              '#748FFC',
              '#5C7CFA',
              '#4C6EF5',
              '#4263EB',
              '#3B5BDB',
              '#364FC7',
            ],
          },
          primaryColor: 'brand',
        }}
      >
        <ZustandProvider createStore={createStore}>
          <Provider pageProps={pageProps}>
            <ErrorBoundary>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ErrorBoundary>
            <Core />
          </Provider>
        </ZustandProvider>
      </MantineProvider>
    </>
  );
};

export default AppPage;
