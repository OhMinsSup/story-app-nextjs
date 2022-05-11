import React, { useRef } from 'react';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// hooks
import { useStore } from '@store/store';
import { useMemoizedFn } from '@hooks/useMemoizedFn';

// constants
import { STATUS_CODE } from '@constants/constant';

// api
import { api } from '@api/module';

// error
import { ApiError } from '@libs/error';
import { Core } from '@components/ui/Core';

interface ProviderProps {
  pageProps: any;
}

const Provider: React.FC<React.PropsWithChildren<ProviderProps>> = ({
  children,
  pageProps,
}) => {
  const { setAuth } = useStore((store) => ({
    setAuth: store.actions?.setAuth,
  }));

  const queryClientRef = useRef<QueryClient>();

  const onError = useMemoizedFn(async (error) => {
    if (ApiError.isAxiosError(error)) {
      switch (error.response?.status) {
        case STATUS_CODE.UNAUTHORIZED:
          await api.logout().then(() => setAuth?.(null));
          break;
        default:
          break;
      }
    }
  });

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
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
  }

  return (
    <QueryClientProvider client={queryClientRef.current as QueryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Core>{children}</Core>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Provider;
