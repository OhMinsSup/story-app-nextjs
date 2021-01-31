import React from 'react';
import MainHeader from '~/components/main/MainHeader';
import MainTemplate from '~/components/main/MainTemplate';

interface PageIndexProps {}

function PageIndex(_: PageIndexProps) {
  return (
    <MainTemplate>
      <MainHeader />
      <div>testin</div>
    </MainTemplate>
  );
}

export default PageIndex;
