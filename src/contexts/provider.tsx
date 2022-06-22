import React, { useRef } from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// constants
import { STATUS_CODE } from '@constants/constant';

// api
import { api } from '@api/module';

// error
import { ApiError } from '@libs/error';

interface ProviderProps {
  pageProps: any;
}

const onError = async (error: unknown) => {
  if (ApiError.isAxiosError(error)) {
    switch (error.response?.status) {
      case STATUS_CODE.UNAUTHORIZED:
        await api.logout();
        break;
      default:
        break;
    }
  }
};

export const SharedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      onError,
    },
    mutations: {
      onError,
    },
  },
});

const Provider: React.FC<React.PropsWithChildren<ProviderProps>> = ({
  children,
  pageProps,
}) => {
  return (
    <QueryClientProvider client={SharedQueryClient}>
      <Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Provider;
