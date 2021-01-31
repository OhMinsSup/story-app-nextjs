import React from 'react';
import styled from 'styled-components';
import MainResponsive from './MainResponsive';

const ManHeaderBlock = styled.div`
  height: 4rem;
`;

const Inner = styled(MainResponsive)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function MainHeader() {
  return (
    <ManHeaderBlock>
      <Inner>header</Inner>
    </ManHeaderBlock>
  );
}

export default MainHeader;
