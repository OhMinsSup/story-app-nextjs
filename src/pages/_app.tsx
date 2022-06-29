import '@assets/main.css';
import 'swiper/css';
import 'dayjs/locale/ko';

import React from 'react';

// components
import { Provider } from '@contexts/index';
import { DefaultSeo } from '@components/ui/Seo';

// type
import type { AppProps } from 'next/app';

interface AppPageProps extends AppProps {
  Component: any;
}

const AppPage: React.FC<AppPageProps> = ({ Component, pageProps }) => {
  return (
    <>
      <DefaultSeo />

      <Provider pageProps={pageProps}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default AppPage;
