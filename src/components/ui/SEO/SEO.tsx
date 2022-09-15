import React from 'react';
import { NextSeo } from 'next-seo';

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
