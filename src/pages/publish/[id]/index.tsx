import React from 'react';
import AppLayout from '@components/layouts/AppLayout';
import Container from '@mui/material/Container';
import NavigationTopbar from '@components/story/detail/NavigationTopbar';
import ImageViewer from '@components/story/detail/ImageViewer';

const PublishDetailPage = () => {
  return (
    <Container maxWidth="md">
      <NavigationTopbar />
      <ImageViewer />
      Form
    </Container>
  );
};

export default PublishDetailPage;

PublishDetailPage.Layout = AppLayout;
