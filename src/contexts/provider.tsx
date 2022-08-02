import React from 'react';

// provider
import { QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CommonProvider } from './common';
import { Provider as JotaiProvider } from 'jotai';
import { globalClient } from '@api/client';

// atom
import { themeAtom } from '@atoms/commonAtom';
import { authAtom } from '@atoms/authAtom';

// types
import type { ThemeType } from '@atoms/commonAtom';

interface ProviderProps {
  pageProps: any;
  theme: ThemeType;
  isAuthication: boolean;
}

export const RootProvider: React.FC<React.PropsWithChildren<ProviderProps>> = ({
  children,
  pageProps,
  isAuthication,
  theme,
}) => {
  return (
    <JotaiProvider
      initialValues={[
        [authAtom, isAuthication],
        [themeAtom, theme],
      ]}
    >
      <QueryClientProvider client={globalClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CommonProvider>{children}</CommonProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </JotaiProvider>
  );
};
