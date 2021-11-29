import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useAlert } from '@hooks/useAlert';
import { useStoryQuery } from '@api/story/story';

// components
import AppLayout from '@components/layouts/AppLayout';
import StoryForm from '@components/story/form/StoryForm';
import StoryLayout from '@components/story/common/StoryLayout';

const PublishModifyPage = () => {
  const router = useRouter();
  const id = router.query.id?.toString();
  const { showAlert, Alert } = useAlert();
  const { data, isError, error } = useStoryQuery(id);

  useEffect(() => {
    if (isError && error) {
      showAlert({
        content: {
          text: error.response?.data.message,
        },
        okHandler: () => router.back(),
        closeHandler: () => router.back(),
      });
    }
  }, [isError, error]);

  return (
    <>
      <StoryLayout>
        <StoryForm data={data} />
      </StoryLayout>
      <Alert />
    </>
  );
};

export default PublishModifyPage;

PublishModifyPage.Layout = AppLayout;
