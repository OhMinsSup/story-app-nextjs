import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import useSWR from 'swr';
import ActiveEditor from '~/containers/write/ActiveEditor';
import PublishScreen from '~/containers/write/PublishScreen';
import { wrapper } from '~/store/configure';
import write from '~/store/modules/write';

const WritePageBlock = styled.div`
  width: 100%;
  height: 100%;
`;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface WritePageProps {
  post: any;
  slug: string;
  isServer: boolean;
}

function WritePage({ post, slug }: WritePageProps) {
  const { data } = useSWR(
    slug ? `http://localhost:3000/api/posts/${slug}` : null,
    fetcher,
    {
      initialData: post,
    }
  );

  return (
    <>
      <Helmet>
        <link href="css/atom-one-light.css" rel="stylesheet" type="text/css" />
      </Helmet>
      <WritePageBlock>
        <ActiveEditor post={data} />
        <PublishScreen />
      </WritePageBlock>
    </>
  );
}

export default WritePage;

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const { slug } = ctx.query as { slug: string };

  if ('slug' in ctx.query) {
    const post = await fetcher(`http://localhost:3000/api/posts/${slug}`);
    if (post) {
      ctx.store.dispatch(
        write.actions.prepareEdit({
          id: post.id,
          title: post.title,
          body: post.body,
          tags: post.tags,
          description: post.short_description,
          urlSlug: post.url_slug,
          isPrivate: post.is_private,
          isMarkdown: post.is_markdown,
          isTemp: post.is_temp,
          thumbnail: post.thumbnail,
        })
      );
      ctx.store.dispatch(write.actions.setInitialBody(post.body));
    }
    return {
      props: {
        slug,
        post,
      },
    };
  }

  return {
    props: {
      slug: '',
      post: null,
    },
  };
});
