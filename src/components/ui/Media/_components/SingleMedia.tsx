import React from 'react';

// components
import SuspenseImage from './SuspenseImage';
import SuspenseVideo from './SuspenseVideo';

import { Suspense } from '@components/ui/Loader';
import { ErrorBoundary } from '@components/ui/Error';

// types
import type { Nullable } from '@utils/assertion';
import type { FileSchema } from '@api/schema/file';
import type { UploadRespSchema } from '@api/schema/resp';

interface SingleMediaProps {
  media: Nullable<FileSchema | UploadRespSchema>;
}

function SingleMedia(props: SingleMediaProps) {
  let component: React.ReactNode | null = <SkeletonImage />;
  if (props.media?.mediaType === 'VIDEO') {
    component = (
      <Suspense fallback={<SkeletonImage />}>
        <SuspenseVideo media={props.media} />
      </Suspense>
    );
  } else if (props.media?.mediaType === 'IMAGE') {
    component = (
      <Suspense fallback={<SkeletonImage />}>
        <SuspenseImage media={props.media} />
      </Suspense>
    );
  }

  return (
    <ErrorBoundary fallback={<SkeletonImage />}>{component}</ErrorBoundary>
  );
}

export default SingleMedia;

const SkeletonImage: React.FC<{ active?: boolean }> = ({ active }) => {
  return null;
};
