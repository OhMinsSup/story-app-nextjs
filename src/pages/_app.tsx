import '@assets/main.css';
import 'swiper/css';
import 'dayjs/locale/ko';

import React from 'react';

// components
import { RootProvider } from '@contexts/provider';
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
      <RootProvider pageProps={pageProps}>
        <Component {...pageProps} />
      </RootProvider>
    </>
  );
};

export default AppPage;
