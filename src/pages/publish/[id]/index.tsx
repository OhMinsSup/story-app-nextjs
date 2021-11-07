import React from 'react';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate } from 'react-query';

// api
import { fetcherOne, useStoryQuery } from '@api/story/story';

// common
import { API_ENDPOINTS } from '@constants/constant';

// hooks
import { useAlert } from '@hooks/useAlert';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Description from '@components/story/detail/Description';
import AppLayout from '@components/layouts/AppLayout';
import NavigationTopbar from '@components/story/detail/NavigationTopbar';
import ImageViewer from '@components/story/detail/ImageViewer';
import PostHead from '@components/story/detail/PostHead';
import StickyHistoryTable from '@components/story/detail/StickyHistoryTable';
import OwnerUser from '@components/story/detail/OwnerUser';

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.query.id?.toString();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.LOCAL.STORY.ROOT, id],
    fetcherOne,
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

function PublishDetailPage({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const router = useRouter();
  const id = router.query.id?.toString();
  const { Alert } = useAlert();
  const { data, isLoading, isError } = useStoryQuery(id);

  return (
    <>
      <Container maxWidth="md">
        <NavigationTopbar creatorUser={data?.user} />
        {isLoading ? (
          <PostHead.Skeleton />
        ) : (
          <PostHead
            title={data?.name}
            backgroundColor={data?.backgroundColor}
            createdAt={data?.createdAt}
            tags={data?.tags}
          />
        )}
        <Stack spacing={3} sx={{ paddingBottom: 10 }}>
          {isLoading ? (
            <>
              <ImageViewer.Skeleton />
              <OwnerUser.Skeleton />
              <Description.Skeleton />
            </>
          ) : (
            <>
              <ImageViewer
                backgroundColor={data?.backgroundColor}
                imageUrl={data?.media.contentUrl}
                name={data?.name}
              />
              <OwnerUser
                creatorProfile={data?.user.profile}
                ownerProfile={data?.user.profile}
              />
              <Description description={data?.description ?? ''} />
            </>
          )}
          <StickyHistoryTable loading={isLoading} />
        </Stack>
      </Container>
      <Alert />
    </>
  );
}

export default PublishDetailPage;

PublishDetailPage.Layout = AppLayout;
