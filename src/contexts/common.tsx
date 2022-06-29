import React, { useEffect } from 'react';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';

// hooks
import { useLocalStorage } from '@mantine/hooks';
import { useMeQuery } from '@api/queries';
import { useNotfiyManager } from '@libs/state/notifyManager';

// types
import type { ColorScheme } from '@mantine/core';

interface CommonProviderProps {}

const THEME_KEY = 'story-color-scheme';

export const CommonProvider: React.FC<
  React.PropsWithChildren<CommonProviderProps>
> = ({ children }) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: THEME_KEY,
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const { userInfo } = useMeQuery();

  const notfiy = useNotfiyManager();

  useEffect(() => {
    notfiy.setNotifyFunction((fn) => {
      fn();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
