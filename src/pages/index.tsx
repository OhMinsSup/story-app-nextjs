import React, { useRef } from 'react';
import { QueryClient, dehydrate } from 'react-query';
import { client } from '@api/client';

// common
import { API_ENDPOINTS } from '@constants/constant';

// components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import AppLayout from '@components/layouts/AppLayout';
import NFTCard from '@components/common/NFTCard';

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
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ width: '100%' }} className="space-y-5 p-5">
          <Grid container spacing={3} direction="row">
            {data?.pages.map((item, i) => (
              <React.Fragment key={i}>
                {item.list.map((store) => (
                  <Grid
                    item
                    columns={{ xl: 4, xs: 4, lg: 3, md: 3, sm: 5 }}
                    key={`nft-${store.id}`}
                  >
                    <NFTCard item={store} />
                  </Grid>
                ))}
              </React.Fragment>
            ))}

            {hasNextPage &&
              Array.from({ length: 10 }).map((_, index) => (
                <Grid
                  item
                  ref={index === 0 ? loadMoreRef : undefined}
                  columns={{ xl: 4, xs: 4, lg: 3, md: 3, sm: 5 }}
                  key={`nft-next-loading-${index}`}
                >
                  <NFTCard.Skeleton />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default IndexPage;

IndexPage.Layout = AppLayout;
