import React from 'react';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate } from 'react-query';

// api
import { fetcherOne, useMutationLike, useStoryQuery } from '@api/story/story';
import { client } from '@api/client';

// common
import { API_ENDPOINTS } from '@constants/constant';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';

import Description from '@components/story/detail/Description';
import AppLayout from '@components/ui/layouts/AppLayout';
import NavigationTopbar from '@components/story/detail/NavigationTopbar';
import ImageViewer from '@components/story/detail/ImageViewer';
import PostHead from '@components/story/detail/PostHead';
import StickyHistoryTable from '@components/story/detail/StickyHistoryTable';
import OwnerUser from '@components/story/detail/OwnerUser';

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import AnotherStories from '@components/story/detail/AnotherStories';
import { useStore } from '@store/store';

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

function StoryDetailPage({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const router = useRouter();
  const id = router.query.id?.toString();

  const userInfo = useStore((store) => store.userInfo);
  const { data, isLoading } = useStoryQuery(id);
  const mutate = useMutationLike();

  const isLike = !!data?.likes.find((like) => like.userId === userInfo?.id);

  const onClickLike = async () => {
    if (!id) return;
    const dataId = id;

    if (isLike) {
      await mutate.mutateAsync({
        dataId,
        action: 'unlike',
      });
    } else {
      await mutate.mutateAsync({
        dataId,
        action: 'like',
      });
    }
  };

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
              <Stack direction="row-reverse" spacing={1}>
                <IconButton
                  aria-label="favorite-border"
                  color={isLike ? 'error' : 'secondary'}
                  className="space-x-2"
                  onClick={onClickLike}
                >
                  <FavoriteBorderIcon />
                  <Typography variant="subtitle1">
                    {data?.likes.length}
                  </Typography>
                </IconButton>
              </Stack>
              <OwnerUser
                creatorProfile={data?.user.profile}
                ownerProfile={data?.owner.profile}
              />
              <Description description={data?.description ?? ''} />
            </>
          )}
          <StickyHistoryTable />
          <AnotherStories userId={data?.user.id} storyId={data?.id} />
        </Stack>
      </Container>
    </>
  );
}

export default StoryDetailPage;

StoryDetailPage.Layout = AppLayout;
