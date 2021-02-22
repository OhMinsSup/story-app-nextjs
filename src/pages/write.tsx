import React from 'react';
import styled from 'styled-components';
import ActiveEditor from '~/containers/write/ActiveEditor';
import { wrapper } from '~/store/configure';

const WritePageBlock = styled.div`
  width: 100%;
  height: 100%;
`;

interface WritePageProps {
  isServer: boolean;
}
function WritePage({ isServer }: WritePageProps) {
  return (
    <WritePageBlock>
      <ActiveEditor isServer={isServer} />
    </WritePageBlock>
  );
}

export default WritePage;

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps(async (_) => {
  const isServer = typeof window === 'undefined';
  return {
    props: {
      isServer,
    },
  };
});
