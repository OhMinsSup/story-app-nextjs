import React from 'react';

// types

import { SingleMedia } from './_components';
import { type Nullable } from '@utils/assertion';
import type { FileSchema } from '@api/schema/file';
import type { UploadRespSchema } from '@api/schema/resp';
import type { VideoElementProps } from './_components/SuspenseVideo';
import type { ImageElementProps } from './_components/SuspenseImage';

interface MediaContentsProps {
  media: Nullable<FileSchema | UploadRespSchema>;
  videoProps?: VideoElementProps;
  imageProps?: ImageElementProps;
}

function MiediaContents_UNSTABLE(props: MediaContentsProps) {
  return <SingleMedia {...props} />;
}

export default MiediaContents_UNSTABLE;
