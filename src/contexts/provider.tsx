import React, { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

// hooks
import { useStore } from '@store/store';
import { useMemoizedFn } from '@hooks/useMemoizedFn';

// constants
import { STATUS_CODE, STORAGE_KEY } from '@constants/constant';

// api
import { api } from '@api/module';

// storage
import { StoryStorage } from '@libs/storage';

// error
import { ApiError } from '@libs/error';

interface ProviderProps {
  pageProps: any;
}

const Provider: React.FC<ProviderProps> = ({ children, pageProps }) => {
  const { setAuth, setLoggedIn } = useStore((store) => ({
    setAuth: store.actions?.setAuth,
    setLoggedIn: store.actions?.setLoggedIn,
  }));

  const queryClientRef = useRef<QueryClient>();

  const onError = useMemoizedFn(async (error) => {
    if (ApiError.isAxiosError(error)) {
      console.log(error.response);
      switch (error.response?.status) {
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
      <Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>
    </QueryClientProvider>
  );
};

export default Provider;
