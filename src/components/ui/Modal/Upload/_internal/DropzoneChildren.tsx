import React from 'react';

// components
import ImageUploadIcon from './ImageUploadIcon';
import { Group, Text } from '@mantine/core';

// utils
import { getIconColor } from './utils';

// types
import type { MantineTheme } from '@mantine/core';
import type { DropzoneStatus } from '@mantine/dropzone';

const DropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 220, pointerEvents: 'none' }}
  >
    <ImageUploadIcon
      status={status}
      style={{ color: getIconColor(status, theme) }}
      size={80}
    />
    <div>
      <Text size="xl" inline>
        Story에 추가 할 NFT를 드래그하거나 클릭하여 파일 선택
      </Text>
    </div>
    <Text size="sm" color="dimmed" inline mt={7}>
      Recommended dimension is 1600 x 840
    </Text>
  </Group>
);

export default DropzoneChildren;
