import React from 'react';

// types

import { SingleMedia } from './_components';
import { type Nullable } from '@utils/assertion';
import type { FileSchema } from '@api/schema/file';
import type { UploadRespSchema } from '@api/schema/resp';

interface MediaContentsProps {
  media: Nullable<FileSchema | UploadRespSchema>;
}

function MiediaContents_UNSTABLE(props: MediaContentsProps) {
  return <SingleMedia media={props.media} />;
}

export default MiediaContents_UNSTABLE;
