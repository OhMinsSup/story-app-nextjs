import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import AppLayout from '@components/layouts/AppLayout';
import NavigationTopbar from '@components/story/detail/NavigationTopbar';
import ImageViewer from '@components/story/detail/ImageViewer';
import PostHead from '@components/story/detail/PostHead';
import StickyHistoryTable from '@components/story/detail/StickyHistoryTable';
import AnotherPosts from '@components/story/detail/AnotherPosts';

const PublishDetailPage = () => {
  return (
    <>
      <Container maxWidth="md">
        <NavigationTopbar />
        <PostHead />
        <Stack spacing={3} sx={{ paddingBottom: 10 }}>
          <ImageViewer />
          <Typography variant="h5" gutterBottom component="div">
            설명
          </Typography>
          <Typography variant="body1" gutterBottom>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
            consectetur, neque doloribus, cupiditate numquam dignissimos laborum
            fugiat deleniti? Eum quasi quidem quibusdam.
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
