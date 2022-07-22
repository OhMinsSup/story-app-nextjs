import React from 'react';

// components
import ImageUploadIcon from './ImageUploadIcon';
import { Group } from '@mantine/core';

// utils
import { getIconColor } from './utils';

// types
import type { MantineTheme } from '@mantine/core';
import type { DropzoneStatus } from '@mantine/dropzone';

const DropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group position="center" className="h-full pointer-events-none">
    <ImageUploadIcon
      status={status}
      style={{ color: getIconColor(status, theme) }}
      size={80}
    />
  </Group>
);

export default DropzoneChildren;
