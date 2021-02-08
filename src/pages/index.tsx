import React from 'react';
import FloatingHomeHeader from '~/components/main/FloatingHomeHeader';
import MainHeader from '~/components/main/MainHeader';
import MainTemplate from '~/components/main/MainTemplate';

interface PageIndexProps {}

function PageIndex(_: PageIndexProps) {
  return (
    <MainTemplate>
      <MainHeader />
      <FloatingHomeHeader />
      <div>testin</div>
    </MainTemplate>
  );
}

export default PageIndex;
