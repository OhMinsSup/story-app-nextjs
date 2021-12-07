import React, { useRef } from 'react';
import { QueryClient, dehydrate } from 'react-query';
import { client } from '@api/client';

// common
import { API_ENDPOINTS } from '@constants/constant';

// components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import AppLayout from '@components/ui/layouts/AppLayout';
import StoriesGridItem from '@components/common/StoriesGridItem';

import { fetcherStories, useStoriesQuery } from '@api/story/story';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();

  const cookie = ctx.req ? ctx.req.headers.cookie : '';
  if (client.defaults.headers) {
    client.defaults.headers.Cookie = '';
    if (ctx.req && cookie) {
      client.defaults.headers.Cookie = cookie;
    }
  }

  await queryClient.prefetchInfiniteQuery(
    [API_ENDPOINTS.LOCAL.STORY.ROOT],
    fetcherStories,
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

function IndexPage({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, fetchNextPage, hasNextPage, isError } = useStoriesQuery();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <div className="main-container">
      <Box sx={{ width: '100%' }} className="space-y-5 p-5">
        <Grid container spacing={3}>
          {data?.pages.map((item, i) => (
            <React.Fragment key={i}>
              {item.list.map((story) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={story.id}>
                  <StoriesGridItem item={story} />
                </Grid>
              ))}
            </React.Fragment>
          ))}
          {hasNextPage &&
            Array.from({ length: 10 }).map((_, index) => (
              <Grid
                item
                ref={index === 0 ? loadMoreRef : undefined}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                key={`nft-next-loading-${index}`}
              >
                <StoriesGridItem.Skeleton />
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
}

export default IndexPage;

IndexPage.Layout = AppLayout;
