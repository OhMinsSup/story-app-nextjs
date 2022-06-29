import '@assets/main.css';
import 'swiper/css';
import 'dayjs/locale/ko';

import React from 'react';

// components
import { Provider } from '@contexts/index';
import { DefaultSeo } from '@components/ui/Seo';

// type
import type { AppProps } from 'next/app';

// store
import { useCreateStore, ZustandProvider } from '@store/store';

interface AppPageProps extends AppProps {
  Component: any;
}

const AppPage: React.FC<AppPageProps> = ({ Component, pageProps }) => {
  const createStore = useCreateStore(pageProps.initialZustandState);

  return (
    <>
      <DefaultSeo />
      <ZustandProvider createStore={createStore}>
        <Provider pageProps={pageProps}>
          <Component {...pageProps} />
        </Provider>
      </ZustandProvider>
    </>
  );
};

export default AppPage;
