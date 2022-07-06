import React from 'react';

// provider
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CommonProvider } from './common';
import { Provider as JotaiProvider } from 'jotai';

// atom
import { useAtomsDebugValue } from 'jotai/devtools';

// utils
import { notifyManager, NOFIFY_DATA } from '@libs/state/notifyManager';

// error
import { ApiError } from '@libs/error';

// constants
import { STATUS_CODE } from '@constants/constant';

interface ProviderProps {
  pageProps: any;
}

export const SharedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        if (ApiError.isAxiosError(error)) {
          const statusCode = error.response?.status ?? -1;
          const check = [
            STATUS_CODE.UNAUTHORIZED,
            STATUS_CODE.FORBIDDEN,
          ].includes(statusCode);
          return !check;
        }
        if (failureCount >= 5) return false;
        return true;
      },
      onError(err) {
        if (ApiError.isAxiosError(err)) {
          switch (err.response?.status) {
            case STATUS_CODE.UNAUTHORIZED:
            case STATUS_CODE.FORBIDDEN: {
              notifyManager.schedule(() => {
                return NOFIFY_DATA.SESSION(err.response?.status);
              });
              break;
            }
            default:
              break;
          }
        }
      },
    },
  },
});

const DebugAtoms = () => {
  useAtomsDebugValue();
  return null;
};

export const RootProvider: React.FC<React.PropsWithChildren<ProviderProps>> = ({
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
