import { PAGE_ENDPOINTS } from '@constants/constant';
import { SITE_URL } from '@constants/env';
import React from 'react';
import Seo from '../Seo';

const NFTsRegister = () => {
  const title = 'Create NFTs | story';
  const url = `${SITE_URL}${PAGE_ENDPOINTS.NFT.REGIST}`;

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

export default NFTsRegister;
