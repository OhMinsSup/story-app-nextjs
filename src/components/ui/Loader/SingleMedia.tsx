/* eslint-disable react/display-name */
import React from 'react';

// types
import type { FileSchema } from '@api/schema/file';

import SuspenseImage from './SuspenseImage';
import SuspenseVideo from './SuspenseVideo';
import { Suspense } from '@components/ui/Loader';
import { useAsync } from 'react-use';
import { getFileType } from '@utils/utils';
import { ErrorBoundary } from '@components/ui/Error';

interface SingleMediaProps {
  file?: FileSchema | null;
}

function SingleMedia(props: SingleMediaProps) {
  const state = useAsync(async () => {
    if (!props.file) return 'IMAGE';
    return await getFileType(props.file);
  }, [props]);

  let component: React.ReactNode | null = <SkeletonImage active />;
  if (state.value === 'VIDEO') {
    component = (
      <Suspense fallback={<SkeletonImage active />}>
        <SuspenseVideo file={props.file} />
      </Suspense>
    );
  } else if (state.value === 'IMAGE') {
    component = (
      <Suspense fallback={<SkeletonImage active />}>
        <SuspenseImage file={props.file} />
      </Suspense>
    );
  }

  return (
    <div className="detail-single-img-area">
      <ErrorBoundary fallback={<SkeletonImage />}>{component}</ErrorBoundary>
    </div>
  );
}

export default SingleMedia;

const SkeletonImage: React.FC<{ active?: boolean }> = ({ active }) => {
  return <>Loading....</>;
};
