import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import useSWR from 'swr';
import ActiveEditor from '~/containers/write/ActiveEditor';
import { wrapper } from '~/store/configure';

const WritePageBlock = styled.div`
  width: 100%;
  height: 100%;
`;

const fetcher = (url: string) => {
  return axios.get(url).then((response) => response.data);
};

interface WritePageProps {
  post: any;
  slug: string;
  isServer: boolean;
}
function WritePage({ post, slug }: WritePageProps) {
  const { data } = useSWR(`http://localhost:3000/api/posts/${slug}`, fetcher, {
    initialData: post,
  });
  console.log(data);
  return (
    <>
      <Helmet>
        <link href="css/atom-one-light.css" rel="stylesheet" type="text/css" />
      </Helmet>
      <WritePageBlock>
        <ActiveEditor />
      </WritePageBlock>
    </>
  );
}

export default WritePage;

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const { slug } = ctx.query as { slug: string };

  const { data } = await fetcher(`http://localhost:3000/api/posts/${slug}`);

  return {
    props: {
      slug,
      post: data,
    },
  };
});
