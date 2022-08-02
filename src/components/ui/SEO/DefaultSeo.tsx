import React from 'react';
import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import { SITE_URL } from '@constants/env';

import type { DefaultSeoProps } from 'next-seo';

export const Title = 'story';
export const Description = '나만의 story를 만들어 보세요.';
export const DefaultImageUrl = '/images/card.jpg';

const SEO_CONSTANTS: DefaultSeoProps = {
  title: Title,
  canonical: SITE_URL,
  description: Description,
  openGraph: {
    url: SITE_URL,
    title: Title,
    description: Description,
    site_name: Title,
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: DefaultImageUrl,
        alt: Title,
      },
    ],
  },
  twitter: {
    handle: `@${Title}`,
    site: `@${Title}`,
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'shortcut icon',
      type: 'image/x-icon',
      href: '/images/favicon.ico',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
  additionalMetaTags: [
    {
      name: 'viewport',
      content:
        'width=device-width,  viewport-fit=cover, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
    },
    {
      name: 'keywords',
      content: 'Story, NFT, Marketplace',
    },
  ],
};

const DefaultSeo = () => {
  return <NextDefaultSeo {...SEO_CONSTANTS} />;
};

export default DefaultSeo;
