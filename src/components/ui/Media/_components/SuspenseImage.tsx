import React from 'react';
import { Image } from '@mantine/core';
import { MediaResource } from '../_internal/resource';

// types
import type { Nullable } from '@utils/assertion';
import type { ImageProps } from '@mantine/core';
import type { FileSchema } from '@api/schema/file';
import type { UploadRespSchema } from '@api/schema/resp';

export type ImageElementProps = ImageProps &
  React.RefAttributes<HTMLDivElement>;

interface SuspenseImageProps extends ImageElementProps {
  media?: Nullable<FileSchema | UploadRespSchema>;
  hiddenExpandBtn?: boolean;
}

const SuspenseImage: React.FC<SuspenseImageProps> = (props) => {
  const { media, ...otherProps } = props;
  if (media) {
    const resource = MediaResource(media, 'IMAGE');

    resource.load();
    resource.read();
  }

  const src = media?.secureUrl;

  return <Image src={src} alt="nft item media" {...otherProps} />;
};

export default SuspenseImage;
