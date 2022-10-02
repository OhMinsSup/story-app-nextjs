import React from 'react';
import { Image } from '@mantine/core';
import { MediaResource } from '../_internal/resource';

// types
import type { Nullable } from '@utils/assertion';
import type { FileSchema } from '@api/schema/file';
import type { UploadRespSchema } from '@api/schema/resp';

interface SuspenseImageProps {
  media?: Nullable<FileSchema | UploadRespSchema>;
  hiddenExpandBtn?: boolean;
}

const SuspenseImage: React.FC<SuspenseImageProps> = (props) => {
  if (props.media) {
    const resource = MediaResource(props.media, 'IMAGE');

    resource.load();
    resource.read();
  }

  const src = props?.media?.secureUrl;

  return <Image radius="md" src={src} alt="nft item media" withPlaceholder />;
};

export default SuspenseImage;
