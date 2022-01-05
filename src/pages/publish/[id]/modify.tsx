import React from 'react';

import { useRouter } from 'next/router';
import { useStoryQuery } from '@api/story/story';

// components
import AppLayout from '@components/ui/layouts/AppLayout';
import StoryForm from '@components/publish/form/StoryForm';
import StoryLayout from '@components/ui/layouts/StoryLayout';

const PublishModifyPage = () => {
  const router = useRouter();
  const id = router.query.id?.toString();
  const { data } = useStoryQuery(id);

  return (
    <>
      <StoryLayout>
        <StoryForm data={data} />
      </StoryLayout>
    </>
  );
};

export default PublishModifyPage;

PublishModifyPage.Layout = AppLayout;
