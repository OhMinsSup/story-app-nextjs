import React from 'react';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import type { DropzoneStatus } from '@mantine/dropzone';

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export default ImageUploadIcon;
