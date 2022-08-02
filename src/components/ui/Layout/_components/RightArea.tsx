import React, { useCallback } from 'react';

// hooks
import { useMantineColorScheme } from '@mantine/core';

// components
import { Box, Group } from '@mantine/core';
import { Sun, Moon, Bell } from 'tabler-icons-react';
import { UniversalButton } from '@components/ui/Button';

import UserMenu from './UserMenu';

function RightArea() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const onToggleColorScheme = useCallback(() => {
    toggleColorScheme();
  }, [toggleColorScheme]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Group pr="md" spacing="md" className="flex-nowrap">
        <UniversalButton onClick={() => console.log('bell')}>
          <Bell />
        </UniversalButton>
        <UniversalButton onClick={onToggleColorScheme}>
          {colorScheme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
        </UniversalButton>
        <UserMenu />
      </Group>
    </Box>
  );
}

export default RightArea;
