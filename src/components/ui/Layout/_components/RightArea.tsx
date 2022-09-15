import React from 'react';

// components
import { Box, Group } from '@mantine/core';

import UserMenu from './UserMenu';

function RightArea() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Group>
        <UserMenu />
      </Group>
    </Box>
  );
}

export default RightArea;
