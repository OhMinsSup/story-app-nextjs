import React, { useRef } from 'react';
// import { getTargetElement } from '@libs/browser-utils';
import { MediaResource } from '../_internal/resource';

// types
import type { Nullable } from '@utils/assertion';
import type { FileSchema } from '@api/schema/file';
import type { UploadRespSchema } from '@api/schema/resp';

export type VideoElementProps = Pick<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  'loop' | 'playsInline' | 'preload' | 'controls' | 'muted' | 'autoPlay'
>;

interface SuspenseVideoProps extends VideoElementProps {
  media?: Nullable<FileSchema | UploadRespSchema>;
}

const SuspenseVideo: React.FC<SuspenseVideoProps> = (props) => {
  const ref = useRef<HTMLVideoElement | null>(null);

  const { media, ...otherProps } = props;

  if (media) {
    const resource = MediaResource(media, 'VIDEO');

    resource.load();
    resource.read();
  }

  return <video ref={ref} src={media?.secureUrl} {...otherProps} />;
};

export default SuspenseVideo;
