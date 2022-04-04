import React from 'react';

// hooks
import { fetchNftDetail, useNftQuery } from '@api/queries';
import { useRouter } from 'next/router';

// api
import { client } from '@api/client';

// components
import { AppShell } from '@mantine/core';
import { Header } from '@components/ui/Header';
import { Container } from '@mantine/core';

// constants
import { API_ENDPOINTS } from '@constants/constant';

// react-query
import { QueryClient, dehydrate } from 'react-query';

// types
import type { GetServerSidePropsContext } from 'next';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.query.id?.toString();

  const queryClient = new QueryClient();
  const cookie = ctx.req ? ctx.req.headers.cookie : '';
  if (client.defaults.headers) {
    (client.defaults.headers as any).Cookie = '';
    if (ctx.req && cookie) {
      (client.defaults.headers as any).Cookie = cookie;
    }
  }

  if (id) {
    await Promise.all([
      queryClient.prefetchQuery(
        [API_ENDPOINTS.LOCAL.STORY.ROOT, parseInt(id.toString(), 10)],
        fetchNftDetail,
      ),
      // queryClient.prefetchQuery(
      //   [API_ENDPOINTS.LOCAL.STORY.ROOT, Number(id), 'OFFERS'],
      //   fetcherOffers,
      // ),
      // queryClient.prefetchQuery(
      //   [API_ENDPOINTS.LOCAL.STORY.ROOT, Number(id), 'HISTORIES'],
      //   fetcherHistories,
      // ),
    ]);
  }

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

function NftDetailPage() {
  const router = useRouter();
  const id = router.query.id?.toString();

  const { data } = useNftQuery(id);
  console.log(data);

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      className="h-full"
      header={<Header />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : undefined,
        },
      })}
    >
      <Container size="lg" className="h-full">
        ???
      </Container>
    </AppShell>
  );
}

export default NftDetailPage;
