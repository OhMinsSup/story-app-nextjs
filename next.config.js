const { withPlugins } = require('next-compose-plugins');
const { withSentryConfig } = require('@sentry/nextjs');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withNextEnv = require('next-env');

const withPWA = require('next-pwa');
// const runtimeCaching = require('next-pwa/cache');

const IS_PROD = process.env.NODE_ENV === 'production';

// const DEPLOYED_ADDRESS = JSON.stringify(fs.readFileSync('deployedAddress', 'utf8').replace(/\n|\r/g, "")),
// const DEPLOYED_ABI = fs.existsSync('deployedABI') && fs.readFileSync('deployedABI', 'utf8'),

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    // 서버 측 suspense 및 ssr 스트리밍 지원에 대한 기본 제공, http 스트리밍을 통해서 서버 렌더링 가능
    reactMode: 'concurrent',
  },

  // * 이용자에게 제공되는 헤더에 nextjs 로 개발되었음을 노출하지 않습니다.
  poweredByHeader: false,

  // * 주소 뒤에 슬래시를 붙일지 여부입니다.
  trailingSlash: true,

  compiler: {
    compiler: {
      removeConsole: IS_PROD
        ? {
            exclude: ['error'],
          }
        : {
            exclude: ['error', 'info', 'log'],
          },
    },
    emotion: true,
  },

  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  images: {
    domains: ['res.cloudinary.com'], // 외부 웹사이트 이미지인경우, 이미지 src 의 도메인을 옵션에 명시
    formats: ['image/avif', 'image/webp'],
  },

  // * CDN 을 설정하려면 자산 접두사를 설정하고 Next.js가 호스팅되는 도메인으로 확인되도록 CDN의 출처를 구성이 가능합니다.
  // https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
  // assetPrefix: IS_PROD ? process.env.NEXT_PUBLIC_SITE_URL : '',

  // * Next.js는 렌더링 된 콘텐츠와 정적 파일을 압축하기 위해 gzip 압축을 제공합니다.
  // https://nextjs.org/docs/api-reference/next.config.js/compression
  compress: true,
};

const composeEnhancers = [
  withNextEnv,
  withSentryConfig,
  withBundleAnalyzer,
  [
    withPWA,
    {
      pwa: {
        dest: 'public',
        disable: !IS_PROD,
      },
    },
  ],
];

module.exports = withPlugins(composeEnhancers, nextConfig);
