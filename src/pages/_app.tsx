import "@assets/main.css";

import React, { useEffect, useRef } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ChakraProvider } from "@chakra-ui/react";
import { useCreateStore, ZustandProvider } from "src/store/store";
import Core from "@components/common/Core";

const Noop: React.FC = ({ children }) => <>{children}</>;

const AppPage = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout || Noop;
  const queryClientRef = useRef<QueryClient | null>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const createStore = useCreateStore(pageProps.initialZustandState);

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ZustandProvider createStore={createStore}>
          <ChakraProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <Core />
          </ChakraProvider>
        </ZustandProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default AppPage;
