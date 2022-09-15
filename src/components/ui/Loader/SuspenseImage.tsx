import React from 'react';

import type { FileSchema } from '@api/schema/file';
import { MediaResource } from '@libs/state/resource';

interface SuspenseImageProps {
  file?: FileSchema | null;
  onOpenForPreview?: () => void;
}

const SuspenseImage: React.FC<SuspenseImageProps> = (props) => {
  if (props.file) {
    const resource = MediaResource(props.file, 'IMAGE');

    resource.load();
    resource.read();
  }

  return (
    <>
      <img src={props?.file?.secureUrl} alt="nft item media" />
    </>
  );
};

export default SuspenseImage;
