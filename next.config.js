const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  // * 이용자에게 제공되는 헤더에 nextjs 로 개발되었음을 노출하지 않습니다.
  poweredByHeader: false,

  // * 주소 뒤에 슬래시를 붙일지 여부입니다.
  trailingSlash: true,

  compiler: {
    removeConsole: isProduction,
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

  // * Next.js는 렌더링 된 콘텐츠와 정적 파일을 압축하기 위해 gzip 압축을 제공합니다.
  // https://nextjs.org/docs/api-reference/next.config.js/compression
  compress: true,
};

const config = withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    runtimeCaching,
    disable: true,
  },
});

delete config.pwa;

module.exports = nextConfig;
