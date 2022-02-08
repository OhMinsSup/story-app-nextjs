import React from 'react';

// components
import AppLayout from '@components/ui/layouts/AppLayout';
import StoryForm from '@components/publish/form/StoryForm';
import StoryLayout from '@components/ui/layouts/StoryLayout';
import ErrorBoundary from '@components/error/ErrorBoundary';

function PublishPage() {
  return (
    <StoryLayout>
      <StoryForm />
    </StoryLayout>
  );
}

export default PublishPage;

PublishPage.Layout = AppLayout;

PublishPage.ErrorBoundary = ErrorBoundary;
