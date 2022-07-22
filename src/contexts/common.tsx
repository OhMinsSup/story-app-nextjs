import React, { useCallback, useRef } from 'react';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';

// atom
import { authAtom, themeAtom } from '@atoms/authAtom';
import { useAtom, useSetAtom } from 'jotai';

// hooks
import { useNotfiyManager } from '@libs/state/notify';
import { useMount } from 'react-use';

// api
import { api } from '@api/module';

// types
import type { ColorScheme } from '@mantine/core';

interface CommonProviderProps {}

export const CommonProvider: React.FC<
  React.PropsWithChildren<CommonProviderProps>
> = ({ children }) => {
  const notify = useNotfiyManager();

  const setAuth = useSetAtom(authAtom);

  const lockRef = useRef(false);

  const [colorScheme, setColorScheme] = useAtom(themeAtom);

  const toggleColorScheme = useCallback(
    (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark')),
    [colorScheme, setColorScheme],
  );

  useMount(() => {
    notify.setNotifyFunction((fn) => {
      const result = fn();
      if (result) {
        switch (result.type) {
          case 'SESSION': {
            if (!lockRef.current) {
              lockRef.current = true;
              setAuth(false);
              api.logout().then(() => (lockRef.current = false));
            }
            break;
          }
          default:
            break;
        }
      }
    });
  });

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          fontFamily: 'Verdana, sans-serif',
          fontFamilyMonospace: 'Monaco, Courier, monospace',
          colorScheme: colorScheme,
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
