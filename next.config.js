const withNextEnv = require('next-env');
const { withPlugins } = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// const fs = require('fs')
const IS_PROD = process.env.NODE_ENV === 'production';

// const DEPLOYED_ADDRESS = JSON.stringify(fs.readFileSync('deployedAddress', 'utf8').replace(/\n|\r/g, "")),
// const DEPLOYED_ABI = fs.existsSync('deployedABI') && fs.readFileSync('deployedABI', 'utf8'),

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  // experimental: {
  // 서버 측 suspense 및 ssr 스트리밍 지원에 대한 기본 제공, http 스트리밍을 통해서 서버 렌더링 가능
  // concurrentFeatures: true,
  // 컴포넌트 레벨에서 동작하는 모든 것을 서버 단에서 처리할 수 있게 된다.
  // serverComponents: true,
  // },
  // * 리액트 개발 중 사용할 환경변수들을 설정
  env: {
    // * 여기에 웹팩에 주입될 환경변수들을 입력
    // DEPLOYED_ADDRESS,
    // DEPLOYED_ABI
  },

  // * 이용자에게 제공되는 헤더에 nextjs 로 개발되었음을 노출하지 않습니다.
  poweredByHeader: false,

  // * 주소 뒤에 슬래시를 붙일지 여부입니다.
  trailingSlash: true,

  images: {
    domains: ['cdn.krafter.space'], // 외부 웹사이트 이미지인경우, 이미지 src 의 도메인을 옵션에 명시
    formats: ['image/avif', 'image/webp'],
  },

  // * CDN 을 설정하려면 자산 접두사를 설정하고 Next.js가 호스팅되는 도메인으로 확인되도록 CDN의 출처를 구성이 가능합니다.
  // https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
  // assetPrefix: IS_PROD ? process.env.NEXT_PUBLIC_SITE_URL : '',

  // * Next.js는 렌더링 된 콘텐츠와 정적 파일을 압축하기 위해 gzip 압축을 제공합니다.
  // https://nextjs.org/docs/api-reference/next.config.js/compression
  compress: true,

  webpack: (config, { isServer }) => {
    // * 개발 중 사용될 웹팩 설정입니다.
    if (!IS_PROD) {
      // * HMR 시 CPU 사용량을 줄이는 빌드 최적화 코드
      config.watchOptions.poll = 1000;
      config.watchOptions.aggregateTimeout = 300;
    }

    return {
      ...config,
      mode: IS_PROD ? 'production' : 'development',
      devtool: IS_PROD ? 'hidden-source-map' : 'eval-source-map',
    };
  },
};

const composeEnhancers = [withNextEnv, withBundleAnalyzer];

module.exports = withPlugins(composeEnhancers, nextConfig);
