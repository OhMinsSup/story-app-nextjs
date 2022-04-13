import React from 'react';

// hooks
import { useMantineColorScheme } from '@mantine/core';

// components
import { Box, Group } from '@mantine/core';
import { Sun, Moon, Bell } from 'tabler-icons-react';
import HeaderControl from './HeaderControl';
import UserMenu from './UserMenu';
import UserAvatar from './UserAvatar';

function HeaderControls() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Box sx={{ position: 'relative' }}>
      <Group pr="md" spacing="md">
        <HeaderControl onClick={() => console.log('bell')}>
          <Bell />
        </HeaderControl>
        <HeaderControl onClick={() => toggleColorScheme()}>
          {colorScheme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
        </HeaderControl>
        <UserMenu control={<UserAvatar />} />
      </Group>
    </Box>
  );
}

export default HeaderControls;
