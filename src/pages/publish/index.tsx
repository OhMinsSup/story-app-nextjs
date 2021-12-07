import React, { useRef, useCallback } from 'react';

// components
import AppLayout from '@components/layouts/AppLayout';
// import StoryForm from '@components/publish/form/StoryForm';
import StoryLayout from '@components/layouts/StoryLayout';

import StoryForm from '@components/publish/form/StoriesForm';

const PublishPage = () => {
  return (
    <StoryLayout>
      <StoryForm />
    </StoryLayout>
  );
};

export default PublishPage;

PublishPage.Layout = AppLayout;
