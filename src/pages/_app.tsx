import "@assets/main.css";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css";
import "filepond-plugin-get-file/dist/filepond-plugin-get-file.min.css";

import React, { useRef } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ChakraProvider } from "@chakra-ui/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { blueGrey, grey, red } from "@mui/material/colors";

// store
import { useCreateStore, ZustandProvider } from "@store/store";

// components
import Core from "@components/common/Core";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    secondary: {
      main: blueGrey[700],
    },
    error: {
      main: red.A400,
    },
  },
});

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
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <Core />
            </ThemeProvider>
          </ChakraProvider>
        </ZustandProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default AppPage;
