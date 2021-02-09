import React from 'react';
import { useRouter } from 'next/router';
import { wrapper } from '~/store/configure';
import FloatingHomeHeader from '~/components/main/FloatingHomeHeader';
import MainHeader from '~/components/main/MainHeader';
import MainResponsive from '~/components/main/MainResponsive';
import MainTemplate from '~/components/main/MainTemplate';

interface PageIndexProps {}

function PageIndex(_: PageIndexProps) {
  const router = useRouter();

  const jsx =
    router.query && 'tab' in router.query ? (
      <>
        {router.query.tab === 'trending' ? (
          <div>trending</div>
        ) : (
          <div>recent</div>
        )}
      </>
    ) : (
      <div>main</div>
    );

  return (
    <MainTemplate>
      <MainHeader />
      <FloatingHomeHeader />
      <MainResponsive>{jsx}</MainResponsive>
    </MainTemplate>
  );
}

export default PageIndex;

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps(async (_) => {
  return {
    props: {},
  };
});
