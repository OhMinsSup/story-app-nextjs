import React, { useEffect } from 'react';

// provider
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CommonProvider } from './common';

// constants
import { STATUS_CODE } from '@constants/constant';

// api
import { api } from '@api/module';

// error
import { ApiError } from '@libs/error';

// hooks
import { useNotfiyManager } from '@libs/state/notifyManager';

interface ProviderProps {
  pageProps: any;
}

const onError = async (error: unknown) => {
  // if (ApiError.isAxiosError(error)) {
  //   switch (error.response?.status) {
  //     case STATUS_CODE.UNAUTHORIZED:
  //       await api.logout();
  //       break;
  //     default:
  //       break;
  //   }
  // }
};

export const SharedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

const Provider: React.FC<React.PropsWithChildren<ProviderProps>> = ({
  children,
  pageProps,
}) => {
  const notfiy = useNotfiyManager();

  useEffect(() => {
    notfiy.setNotifyFunction((fn) => {
      fn();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryClientProvider client={SharedQueryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CommonProvider>{children}</CommonProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Provider;
