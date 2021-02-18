import React from 'react';
import styled from 'styled-components';
import { wrapper } from '~/store/configure';

const WritePageBlock = styled.div`
  width: 100%;
  height: 100%;
`;

interface WritePageProps {}
function WritePage(_: WritePageProps) {
  return <WritePageBlock>작성</WritePageBlock>;
}

export default WritePage;

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps(async (_) => {
  return {
    props: {},
  };
});
