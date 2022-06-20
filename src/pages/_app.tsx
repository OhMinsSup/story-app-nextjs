import '@assets/main.css';
import 'swiper/css';
import 'dayjs/locale/ko';

import React from 'react';

// components
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { Provider } from '@contexts/index';
import { DefaultSeo } from '@components/ui/Seo';

// type
import type { AppProps } from 'next/app';
import type { ColorScheme } from '@mantine/core';

// hooks
import { useLocalStorage } from '@mantine/hooks';

// store
import { useCreateStore, ZustandProvider } from '@store/store';

const THEME_KEY = 'story-color-scheme';

interface AppPageProps extends AppProps {
  Component: any;
}

const AppPage: React.FC<AppPageProps> = ({ Component, pageProps }) => {
  const createStore = useCreateStore(pageProps.initialZustandState);

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: THEME_KEY,
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <DefaultSeo />
      <ZustandProvider createStore={createStore}>
        <Provider pageProps={pageProps}>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              theme={{
                fontFamily: 'Verdana, sans-serif',
                fontFamilyMonospace: 'Monaco, Courier, monospace',
                colorScheme: colorScheme || 'light',
                colors: {
                  // override dark colors to change them for all components
                  dark: [
                    '#d5d7e0',
                    '#acaebf',
                    '#8c8fa3',
                    '#666980',
                    '#4d4f66',
                    '#34354a',
                    '#2b2c3d',
                    '#1d1e30',
                    '#0c0d21',
                    '#01010a',
                  ],
                  brand: [
                    '#EDF2FF',
                    '#DBE4FF',
                    '#BAC8FF',
                    '#91A7FF',
                    '#748FFC',
                    '#5C7CFA',
                    '#4C6EF5',
                    '#4263EB',
                    '#3B5BDB',
                    '#364FC7',
                  ],
                },
                primaryColor: 'brand',
              }}
              withGlobalStyles
              withNormalizeCSS
            >
              <Component {...pageProps} />
            </MantineProvider>
          </ColorSchemeProvider>
        </Provider>
      </ZustandProvider>
    </>
  );
};

export default AppPage;
