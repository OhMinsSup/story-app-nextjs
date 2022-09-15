import React from 'react';
import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import { SITE_URL } from '@constants/env';

import type { DefaultSeoProps } from 'next-seo';

export const Title = 'Remix';
export const Description =
  "Remix is the world's first and largest web3 marketplace for NFTs and crypto collectibles. Browse, create, buy, sell, and auction NFTs using Remix today.";
export const DefaultImageUrl = '/images/remix.jpeg';
const Author = 'Remix';

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
      href: '/favicons/favicon.ico',
    },
    {
      rel: 'icon',
      sizes: '32x32',
      type: 'image/png',
      href: '/favicons/icon-32x32.png',
    },
    {
      rel: 'icon',
      sizes: '16x16',
      type: 'image/png',
      href: '/favicons/icon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicons/icon-180x180.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
  additionalMetaTags: [
    {
      name: 'author',
      content: Author,
    },
    {
      name: 'theme-color',
      content: '#ffffff',
    },
    {
      name: 'viewport',
      content:
        'width=device-width, viewport-fit=cover, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
    },
    {
      name: 'keywords',
      content: 'NFT, drops, marketplace, web, klaytn, web3, blockchain',
    },
  ],
};

const DefaultSeo = () => {
  return <NextDefaultSeo {...SEO_CONSTANTS} />;
};

export default DefaultSeo;
