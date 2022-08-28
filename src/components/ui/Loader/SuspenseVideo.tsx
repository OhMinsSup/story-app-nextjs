import React, { useRef } from 'react';
import { MediaResource } from '@libs/state/resource';

import type { FileSchema } from '@api/schema/file';

interface SuspenseVideoProps {
  file?: FileSchema | null;
}

const SuspenseVideo: React.FC<SuspenseVideoProps> = (props) => {
  const ref = useRef<HTMLVideoElement | null>(null);

  if (props.file) {
    const resource = MediaResource(props.file, 'VIDEO');

    resource.load();
    resource.read();
  }

  return (
    <>
      <video
        ref={ref}
        loop
        playsInline
        preload="none"
        src={props?.file?.secureUrl}
        width="100%"
      />
    </>
  );
};

export default SuspenseVideo;
