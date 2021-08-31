// const dotenvLoad = require('dotenv-load');
const withNextEnv = require('next-env');
const { withPlugins } = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// const fs = require('fs')
const IS_PROD = process.env.NODE_ENV === 'production';
const IS_PROD_DEPLOY_GROUP = process.env.DEPLOY_GROUP === 'production';

console.log('NEXT_PUBLIC_SITE_URL', process.env.NEXT_PUBLIC_SITE_URL);
console.log('NEXT_PUBLIC_API_HOST', process.env.NEXT_PUBLIC_API_HOST);

// const DEPLOYED_ADDRESS = JSON.stringify(fs.readFileSync('deployedAddress', 'utf8').replace(/\n|\r/g, "")),
// const DEPLOYED_ABI = fs.existsSync('deployedABI') && fs.readFileSync('deployedABI', 'utf8'),

// * .env 파일을 불러옵니다.
// switch (process.env.DEPLOY_GROUP) {
//   case 'production':
//     dotenvLoad('prod');
//     break;
//   case 'development':
//     dotenvLoad('dev');
//     break;
//   default:
//     dotenvLoad('template');
//     break;
// }

const nextConfig = {
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
    domains: [], // 외부 웹사이트 이미지인경우, 이미지 src 의 도메인을 옵션에 명시
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

    if (!isServer) {
      config.resolve.fallback.fs = false;
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
