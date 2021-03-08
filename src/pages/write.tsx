import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import ActiveEditor from '~/containers/write/ActiveEditor';
import { wrapper } from '~/store/configure';

const getUrlSlugPost = (slug?: string) => {
  if (slug) {
    return axios
      .get(`http://localhost:3000/api/posts/${slug}`)
      .then((data) => data);
  }
  return null;
};

const WritePageBlock = styled.div`
  width: 100%;
  height: 100%;
`;

interface WritePageProps {
  slug: string | null;
  isServer: boolean;
}
function WritePage({ isServer }: WritePageProps) {
  // const { data } = useQuery(['post', slug], () => {
  //   if (!slug) return;
  //   getUrlSlugPost(slug);
  // });

  // console.log(data);

  return (
    <>
      <Helmet>
        <link href="css/atom-one-light.css" rel="stylesheet" type="text/css" />
      </Helmet>
      <WritePageBlock>
        <ActiveEditor isServer={isServer} />
      </WritePageBlock>
    </>
  );
}

export default WritePage;

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const isServer = typeof window === 'undefined';

    // const { slug } = context.query as { slug: string };
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['post', '1'], () => getUrlSlugPost('1'), {
      staleTime: 10000,
    });

    return {
      props: {
        slug: '1',
        isServer,
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);
