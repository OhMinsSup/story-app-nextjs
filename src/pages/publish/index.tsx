import React, { useRef, useCallback } from 'react';

// components
import AppLayout from '@components/ui/layouts/AppLayout';
// import StoryForm from '@components/publish/form/StoryForm';
import StoryLayout from '@components/ui/layouts/StoryLayout';

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
