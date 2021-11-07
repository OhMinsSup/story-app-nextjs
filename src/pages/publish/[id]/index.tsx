import React from 'react';
import { useRouter } from 'next/router';

// api
import { useStoryQuery } from '@api/story/story';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import AppLayout from '@components/layouts/AppLayout';
import NavigationTopbar from '@components/story/detail/NavigationTopbar';
import ImageViewer from '@components/story/detail/ImageViewer';
import PostHead from '@components/story/detail/PostHead';
import StickyHistoryTable from '@components/story/detail/StickyHistoryTable';
import AnotherPosts from '@components/story/detail/AnotherPosts';
import OwnerUser from '@components/story/detail/OwnerUser';

const PublishDetailPage = () => {
  const router = useRouter();
  const id = router.query.id?.toString();
  const { data, isLoading, isError } = useStoryQuery(id);

  return (
    <>
      <Container maxWidth="md">
        <NavigationTopbar />
        <PostHead />
        <Stack spacing={3} sx={{ paddingBottom: 10 }}>
          <ImageViewer />
          <OwnerUser />
          <Typography variant="h5" gutterBottom component="div">
            설명
          </Typography>
          <Typography variant="body1" gutterBottom>
            {data?.result.description}
          </Typography>
          <StickyHistoryTable />
          <AnotherPosts />
        </Stack>
      </Container>
    </>
  );
};

export default PublishDetailPage;

PublishDetailPage.Layout = AppLayout;
