import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useAlert } from '@hooks/useAlert';
import { useStoryQuery } from '@api/story/story';

// components
import AppLayout from '@components/ui/layouts/AppLayout';
import StoryForm from '@components/publish/form/StoryForm';
import StoryLayout from '@components/ui/layouts/StoryLayout';

const PublishModifyPage = () => {
  const router = useRouter();
  const id = router.query.id?.toString();
  const { showAlert, Alert } = useAlert();
  const { data, isError, error } = useStoryQuery(id);

  useEffect(() => {
    if (isError && error) {
      showAlert({
        content: {
          text: error.response?.data.message ?? '네트워크 오류가 발생했습니다.',
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
