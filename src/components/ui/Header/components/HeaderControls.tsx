import React, { useCallback } from 'react';

// hooks
import { useMantineColorScheme } from '@mantine/core';
import { useMeQuery } from '@api/queries';
import { useRouter } from 'next/router';

// components
import { Box, Group } from '@mantine/core';
import { Sun, Moon, Bell } from 'tabler-icons-react';
import HeaderControl from './HeaderControl';
import UserMenu from './UserMenu';
import UserAvatar from './UserAvatar';

// constants
import { PAGE_ENDPOINTS } from '@constants/constant';

function HeaderControls() {
  const router = useRouter();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { userInfo } = useMeQuery();

  const onToggleColorScheme = useCallback(() => {
    toggleColorScheme();
  }, [toggleColorScheme]);

  const onMoveToLogin = useCallback(() => {
    router.push(PAGE_ENDPOINTS.LOGIN);
  }, [router]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Group pr="md" spacing="md">
        {userInfo && (
          <HeaderControl onClick={() => console.log('bell')}>
            <Bell />
          </HeaderControl>
        )}
        <HeaderControl onClick={onToggleColorScheme}>
          {colorScheme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
        </HeaderControl>
        {userInfo ? (
          <UserMenu control={<UserAvatar />} />
        ) : (
          <HeaderControl onClick={onMoveToLogin}>
            <UserAvatar userInfo={userInfo} />
          </HeaderControl>
        )}
      </Group>
    </Box>
  );
}

export default HeaderControls;
