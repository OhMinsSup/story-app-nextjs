import React, { useState } from 'react';
import Head from 'next/head';
import { useIsomorphicLayoutEffect } from 'react-use';
import { isBrowser } from '@utils/utils';

interface SEOProps {
  title: string;
  description: string;
  type: 'website' | 'article';
  image: string;
  url: string;
}
const SeoHead: React.FC<Partial<SEOProps>> = ({
  title,
  description,
  type,
  image,
  url,
}) => {
  const [siteUrl, setSiteUrl] = useState('');

  useIsomorphicLayoutEffect(() => {
    if (isBrowser) {
      setSiteUrl(url ?? window.location.href);
    } else {
      setSiteUrl(url || '/');
    }
  }, [url]);

  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={siteUrl} />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="description" content={description} />
      <meta property="og:image" content={image} />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href="/images/favicon.ico"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/images/apple-touch-icon.png"
      />
      <link rel="icon" sizes="16x16" href="/images/favicon-16x16.png" />
      <link rel="icon" sizes="32x32" href="/images/favicon-32x32.png" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={title} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={image} />
      <meta
        name="viewport"
        content="width=device-width,  viewport-fit=cover, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
    </Head>
  );
};

export default SeoHead;

SeoHead.defaultProps = {
  title: 'Story',
  description: '나만의 Story를 만들어 보세요.',
  type: 'website',
  image: 'images/card.jpg',
  url: '/',
};
