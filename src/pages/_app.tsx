import "@assets/main.css";

import React from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

const Noop: React.FC = ({ children }) => <>{children}</>;

const AppPage = ({ Component, pageProps }: AppProps) => {
  const Layout = (Component as any).Layout || Noop;
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default AppPage;
