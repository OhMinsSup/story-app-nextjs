import React from 'react';
import { NextSeo } from 'next-seo';

// constants
import { SITE_URL } from '@constants/env';

// types
import type { NextSeoProps } from 'next-seo';

export const Title = 'web-boilerplate';
export const Description = '쉽고 빠른 템플릿';
export const DefaultImageUrl = '/images/card.png';

interface SeoProps extends NextSeoProps {}

const Seo: React.FC<SeoProps> = (props) => {
  return <NextSeo {...props} />;
};

export default Seo;

Seo.defaultProps = {
  title: Title,
  canonical: SITE_URL,
  description: Description,
  openGraph: {
    url: SITE_URL,
    title: Title,
    description: Description,
    site_name: Title,
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
      href: '/favicon/favicon.ico',
    },
    {
      rel: 'icon',
      sizes: '32x32',
      href: '/favicon/icon-32x32.png',
    },
    {
      rel: 'icon',
      sizes: '16x16',
      href: '/favicon/icon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/favicon/apple-touch-icon.png',
      sizes: '152x152',
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
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
    },
  ],
};
