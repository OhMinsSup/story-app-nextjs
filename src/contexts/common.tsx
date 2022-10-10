import React, { useCallback, useEffect, useRef } from 'react';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';

// atom
import { authAtom } from '@atoms/authAtom';
import { readWriteThemaAtom } from '@atoms/commonAtom';
import { useAtom, useSetAtom } from 'jotai';

import {
  startNavigationProgress,
  resetNavigationProgress,
  NavigationProgress,
} from '@mantine/nprogress';

// hooks
import { useNotfiyManager } from '@libs/state/notify';
import { useMount } from 'react-use';
import { useRouter } from 'next/router';

// api
import { api } from '@api/module';

// types
import type { ColorScheme } from '@mantine/core';

interface CommonProviderProps {}

export const CommonProvider: React.FC<
  React.PropsWithChildren<CommonProviderProps>
> = ({ children }) => {
  const notify = useNotfiyManager();

  const router = useRouter();

  const setAuth = useSetAtom(authAtom);

  const lockRef = useRef(false);

  const [colorScheme, setColorScheme] = useAtom(readWriteThemaAtom);

  const toggleColorScheme = useCallback(
    (value?: ColorScheme) => setColorScheme(value),
    [setColorScheme],
  );

  useMount(() => {
    notify.setNotifyFunction((fn) => {
      const result = fn();
      if (result) {
        switch (result.type) {
          case 'SESSION': {
            if (!lockRef.current) {
              lockRef.current = true;
              setAuth(false);
              api.logout().then(() => (lockRef.current = false));
            }
            break;
          }
          default:
            break;
        }
      }
    });
  });

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && startNavigationProgress();
    const handleComplete = () => resetNavigationProgress();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.asPath]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          fontFamily: 'Verdana, sans-serif',
          fontFamilyMonospace: 'Monaco, Courier, monospace',
          colorScheme: colorScheme,
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
        withGlobalStyles
        withNormalizeCSS
      >
        <NavigationProgress />
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
