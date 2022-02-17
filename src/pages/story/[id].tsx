import React from 'react';
import { useRouter } from 'next/router';
import { QueryClient, dehydrate } from 'react-query';

// api
import {
  fetcherOne,
  useMutationLike,
  useMutationStatusUpdate,
  useStoryQuery,
} from '@api/story/story';
import { fetcherOffers, fetcherHistories } from '@api/story/nft';
import { client } from '@api/client';

// common
import { API_ENDPOINTS } from '@constants/constant';
import { isAxiosError } from '@utils/utils';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import Description from '@components/story/detail/Description';
import AppLayout from '@components/ui/layouts/AppLayout';
import NavigationTopbar from '@components/story/detail/NavigationTopbar';
import ImageViewer from '@components/story/detail/ImageViewer';
import PostHead from '@components/story/detail/PostHead';
import HistoryTable from '@components/story/detail/HistoryTable';
import OwnerUser from '@components/story/detail/OwnerUser';
import AnotherStories from '@components/story/detail/AnotherStories';
import ErrorBoundary from '@components/error/ErrorBoundary';
import OfferTable from '@components/story/detail/OfferTable';

import type { GetServerSidePropsContext } from 'next';

// hooks
import { useStore } from '@store/store';
import { useAlert } from '@hooks/useAlert';

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

  await Promise.all([
    queryClient.prefetchQuery(
      [API_ENDPOINTS.LOCAL.STORY.ROOT, Number(id)],
      fetcherOne,
    ),
    queryClient.prefetchQuery(
      [API_ENDPOINTS.LOCAL.STORY.ROOT, Number(id), 'OFFERS'],
      fetcherOffers,
    ),
    queryClient.prefetchQuery(
      [API_ENDPOINTS.LOCAL.STORY.ROOT, Number(id), 'HISTORIES'],
      fetcherHistories,
    ),
  ]);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

function StoryDetailPage() {
  const router = useRouter();
  const id = router.query.id?.toString();

  const userInfo = useStore((store) => store.userInfo);

  const { data, isLoading } = useStoryQuery(id);
  const like = useMutationLike();
  const status = useMutationStatusUpdate();
  const { Alert, showAlert } = useAlert();

  const isLike = !!data?.likes.find((like) => like.userId === userInfo?.id);

  const onClickLike = async () => {
    if (!id) return;
    const dataId = id;

    try {
      const { data } = await like.mutateAsync({
        dataId,
        action: isLike ? 'unlike' : 'like',
      });

      if (!data.ok) {
        const error = new Error();
        error.name = 'ApiError';
        error.message = JSON.stringify({
          resultCode: data.resultCode,
          message: data.message,
        });
        throw error;
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const { response } = error;
        let message = '에러가 발생했습니다.\n다시 시도해 주세요.';
        message = response.data.message || message;
        showAlert({
          content: {
            text: message,
          },
        });
        throw error;
      }

      if (error instanceof Error && error.name === 'ApiError') {
        const { message } = JSON.parse(error.message);
        showAlert({
          content: {
            text: message ?? '에러가 발생했습니다.\n다시 시도해 주세요.',
          },
        });
      }
    }
  };

  const onClickStatus = async () => {
    if (!id) return;
    const dataId = Number(id);

    try {
      const { data } = await status.mutateAsync({
        dataId,
      });

      if (!data.ok) {
        const error = new Error();
        error.name = 'ApiError';
        error.message = JSON.stringify({
          resultCode: data.resultCode,
          message: data.message,
        });
        throw error;
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const { response } = error;
        let message = '에러가 발생했습니다.\n다시 시도해 주세요.';
        message = response.data.message || message;
        showAlert({
          content: {
            text: message,
          },
        });
        throw error;
      }

      if (error instanceof Error && error.name === 'ApiError') {
        const { message } = JSON.parse(error.message);
        showAlert({
          content: {
            text: message ?? '에러가 발생했습니다.\n다시 시도해 주세요.',
          },
        });
      }
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
                {data?.owner?.id !== userInfo?.id &&
                  data?.salesStatus === 'sale' && (
                    <Button variant="outlined" color="primary">
                      구매하기
                    </Button>
                  )}
                {data?.owner?.id === userInfo?.id &&
                  data?.salesStatus === 'waiting' && (
                    <LoadingButton
                      variant="outlined"
                      color="primary"
                      loading={status.isLoading}
                      onClick={onClickStatus}
                    >
                      판매하기
                    </LoadingButton>
                  )}
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
          <OfferTable />
          <HistoryTable />
          <AnotherStories userId={data?.user.id} storyId={data?.id} />
        </Stack>
      </Container>
      <Alert />
    </>
  );
}

export default StoryDetailPage;

StoryDetailPage.Layout = AppLayout;

StoryDetailPage.ErrorBoundary = ErrorBoundary;
