import React, { useRef, useCallback } from 'react';

// components
import AppLayout from '@components/layouts/AppLayout';

import StoryForm from '@components/story/form/StoryForm';

const PublishPage = () => {
  return <StoryForm />;
};

export default PublishPage;

PublishPage.Layout = AppLayout;
