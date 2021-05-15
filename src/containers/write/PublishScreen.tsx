import React from 'react';
import { useSelector } from 'react-redux';
import PublishPreviewContainer from '~/components/write/PublishPreviewContainer';
import PublishScreenTemplate from '~/components/write/PublishScreenTemplate';
import { RootState } from '~/store/modules';

interface PublishScreenProps {}
function PublishScreen(_: PublishScreenProps) {
  const { visible } = useSelector((state: RootState) => ({
    visible: state.write.publish,
  }));
  return (
    <PublishScreenTemplate
      visible={visible}
      left={<PublishPreviewContainer />}
      right={<div>right</div>}
    />
  );
}

export default PublishScreen;
