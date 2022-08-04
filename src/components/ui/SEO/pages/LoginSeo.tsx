import { PAGE_ENDPOINTS } from '@constants/constant';
import { SITE_URL } from '@constants/env';
import React from 'react';
import Seo from '../Seo';

const LoginSeo = () => {
  const title = 'Login | Remix';
  const url = `${SITE_URL}${PAGE_ENDPOINTS.LOGIN}`;

  return (
    <Seo
      canonical={url}
      title={title}
      openGraph={{
        title,
        url,
      }}
    />
  );
};

export default LoginSeo;
