import React from 'react';

// hooks
import { useMantineColorScheme } from '@mantine/core';

// components
import { Box, Group, Avatar } from '@mantine/core';
import { Sun, Moon, Bell } from 'tabler-icons-react';
import HeaderControl from './HeaderControl';

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
        <HeaderControl onClick={() => console.log('로그인')}>
          <Avatar radius="xl" />
        </HeaderControl>
      </Group>
    </Box>
  );
}

export default HeaderControls;
