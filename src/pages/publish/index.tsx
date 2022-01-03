import React from 'react';

// components
import AppLayout from '@components/ui/layouts/AppLayout';
import StoryForm from '@components/publish/form/StoryForm';
import StoryLayout from '@components/ui/layouts/StoryLayout';

// contexts
import { UploadProvider } from '@contexts/upload/context';

const PublishPage = () => {
  return (
    <UploadProvider>
      <StoryLayout>
        <StoryForm />
      </StoryLayout>
    </UploadProvider>
  );
};

export default PublishPage;

PublishPage.Layout = AppLayout;
