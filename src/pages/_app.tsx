import '@assets/main.css';
import 'swiper/css';
import 'dayjs/locale/ko';

import React from 'react';

// hooks
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useHydrateAtoms } from 'jotai/utils';
import { authAtom } from '@atoms/authAtom';

// components
import { RootProvider } from '@contexts/provider';
import { DefaultSeo } from '@components/ui/Seo';

// utils
import { isString } from '@utils/assertion';
import { getCookie } from 'cookies-next';
import jwtDecode, { JwtPayload } from 'jwt-decode';

// constants
import { API_ENDPOINTS, COOKIE_KEY, QUERIES_KEY } from '@constants/constant';

// api
import { api } from '@api/module';

// type
import type { AppContext, AppProps } from 'next/app';
import type { UserSchema } from '@api/schema/story-api';

interface AppPageProps extends AppProps {
  Component: any;
  isAuthication: boolean;
}

function AppPage({ Component, pageProps, ...resetProps }: AppPageProps) {
  useHydrateAtoms(
    resetProps.isAuthication ? [[authAtom, resetProps.isAuthication]] : [],
  );

  return (
    <>
      <DefaultSeo />
      <RootProvider pageProps={pageProps}>
        <Component {...pageProps} />
      </RootProvider>
    </>
  );
}

export default AppPage;

AppPage.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {};
  // 하위 컴포넌트에 getInitialProps가 있다면 추가 (각 개별 컴포넌트에서 사용할 값 추가)
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // _app에서 props 추가 (모든 컴포넌트에서 공통적으로 사용할 값 추가)
  pageProps = { ...pageProps };

  const token = getCookie(COOKIE_KEY.ACCESS_TOKEN, {
    req: ctx.req,
    res: ctx.res,
  });

  if (!token || !isString(token)) {
    return { pageProps, isAuthication: false };
  }

  const decoded = jwtDecode<JwtPayload>(token); // Returns with the JwtPayload type
  const exp = decoded.exp ?? 0;
  const diff = exp - Math.floor(Date.now() / 1000);
  if (diff > 0) {
    const client = new QueryClient();

    const cookie = ctx?.req?.headers?.cookie ?? '';

    try {
      // server side user info prefetch react query
      await client.prefetchQuery(QUERIES_KEY.ME, async () => {
        const response = await api.get<UserSchema>({
          url: API_ENDPOINTS.LOCAL.USER.ME,
          config: {
            headers: {
              Cookie: cookie,
            },
          },
        });
        return response.data.result;
      });

      const session = client.getQueryData<UserSchema>(QUERIES_KEY.ME);
      Object.assign(pageProps, {
        dehydratedState: dehydrate(client),
      });
      return { pageProps, isAuthication: !!session };
    } catch (error) {
      return { pageProps, isAuthication: false };
    }
  }

  return {
    pageProps,
    isAuthication: false,
  };
};
