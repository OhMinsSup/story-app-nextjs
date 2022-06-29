import React from 'react';

// provider
import { Provider as JotaiProvider } from 'jotai';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CommonProvider } from './common';

// hooks
import { useAtomsDebugValue } from 'jotai/devtools';

interface ProviderProps {
  pageProps: any;
}

export const SharedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const DebugAtoms = () => {
  useAtomsDebugValue();
  return null;
};

const Provider: React.FC<React.PropsWithChildren<ProviderProps>> = ({
  children,
  pageProps,
}) => {
  return (
    <JotaiProvider>
      <QueryClientProvider client={SharedQueryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CommonProvider>{children}</CommonProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <DebugAtoms />
    </JotaiProvider>
  );
};

export default Provider;
