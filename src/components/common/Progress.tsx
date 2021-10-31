import NProgress from 'nprogress';
import { Router } from 'next/router';
import { css, Global } from '@emotion/react';

const start = (url: string) => {
  // 작품 내역 페이지에서 탭 이동시 progress bar 보이지 않도록 처리
  if (url.search(/histories/) !== -1 || !url.search(/histories/)) return;
  NProgress.start();
};

const done = () => {
  NProgress.done();
};

Router.events.on('routeChangeStart', start);
Router.events.on('routeChangeComplete', done);
Router.events.on('routeChangeError', done);

const Progress = () => {
  return <Global styles={NProgressStyles} />;
};

export default Progress;

const NProgressStyles = css`
  /* Source: https://unpkg.com/nprogress@0.2.0/nprogress.css + styled-components implementation */
  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: #0288d1;
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
  }
`;
