import React, { useRef, useCallback } from 'react';

// components
import AppLayout from '@components/layouts/AppLayout';
import StoryForm from '@components/story/form/StoryForm';
import StoryLayout from '@components/story/common/StoryLayout';

const PublishPage = () => {
  return (
    <StoryLayout>
      <StoryForm />
    </StoryLayout>
  );
};

export default PublishPage;

PublishPage.Layout = AppLayout;
