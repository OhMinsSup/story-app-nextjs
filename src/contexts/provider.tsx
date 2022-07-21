import React from 'react';

// provider
import { QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CommonProvider } from './common';
import { Provider as JotaiProvider } from 'jotai';
import { globalClient } from '@api/client';

interface ProviderProps {
  pageProps: any;
}

export const RootProvider: React.FC<React.PropsWithChildren<ProviderProps>> = ({
  children,
  pageProps,
}) => {
  return (
    <JotaiProvider>
      <QueryClientProvider client={globalClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CommonProvider>{children}</CommonProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </JotaiProvider>
  );
};
