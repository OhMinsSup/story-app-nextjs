import React, { useRef } from 'react';

// hooks
import { fetchNftList, useNftListQuery } from '@api/queries';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';

// compoments
import { StoriesCard } from '@components/ui/Card';
import { Header } from '@components/ui/Header';
import { Sidebar } from '@components/ui/Sidebar';
import { AppShell, SimpleGrid } from '@mantine/core';

// hooks
import { useMediaQuery } from '@mantine/hooks';

// react-query
import { dehydrate, QueryClient } from 'react-query';

// api
import { client } from '@api/client';

// constants
import { API_ENDPOINTS } from '@constants/constant';

// types
import type { GetServerSidePropsContext } from 'next';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();

  const cookie = ctx.req ? ctx.req.headers.cookie : '';
  if (client.defaults.headers) {
    (client.defaults.headers as any).Cookie = '';
    if (ctx.req && cookie) {
      (client.defaults.headers as any).Cookie = cookie;
    }
  }

  await queryClient.prefetchInfiniteQuery(
    [API_ENDPOINTS.LOCAL.STORY.ROOT],
    fetchNftList,
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

const IndexPage = () => {
  const smallScreen = useMediaQuery('(max-width: 768px)');
  const { data, fetchNextPage, hasNextPage } = useNftListQuery();

  const ref = useRef<HTMLDivElement | null>(null);

  useIntersectionObserver({
    target: ref,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={smallScreen ? undefined : <Sidebar />}
      header={<Header />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : undefined,
        },
      })}
    >
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: 'md' },
          { maxWidth: 755, cols: 2, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
      >
        {data?.pages.map((item, i) => (
          <React.Fragment key={`grid-${i}`}>
            {item.list.map((story) => (
              <StoriesCard item={story} key={`stories-item-grid-${story.id}`} />
            ))}
          </React.Fragment>
        ))}
        {hasNextPage &&
          Array.from({ length: 10 }).map((_, index) => (
            <div
              key={`loading-key-${index}`}
              ref={index === 0 ? ref : undefined}
            />
          ))}
      </SimpleGrid>
    </AppShell>
  );
};

export default IndexPage;
