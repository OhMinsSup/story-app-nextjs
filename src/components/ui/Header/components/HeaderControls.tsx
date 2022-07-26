import React, { useCallback } from 'react';

// hooks
import { useMantineColorScheme } from '@mantine/core';

// components
import { Box, Group } from '@mantine/core';
import { Sun, Moon, Bell } from 'tabler-icons-react';
import HeaderControl from './HeaderControl';
import UserMenu from './UserMenu';

function HeaderControls() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const onToggleColorScheme = useCallback(() => {
    toggleColorScheme();
  }, [toggleColorScheme]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Group pr="md" spacing="md" className="flex-nowrap">
        <HeaderControl onClick={() => console.log('bell')}>
          <Bell />
        </HeaderControl>
        <HeaderControl onClick={onToggleColorScheme}>
          {colorScheme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
        </HeaderControl>
        <UserMenu />
      </Group>
    </Box>
  );
}

export default HeaderControls;
