import React from 'react';

// shallow
import shallow from 'zustand/shallow';

// hooks
import { useRouter } from 'next/router';
import { useStore } from '@store/store';

// api
import { api } from '@api/module';

// storage
import { StoryStorage } from '@libs/storage';

// constants
import { STORAGE_KEY } from '@constants/constant';

// components
import { Text, Group, Menu, Divider, Avatar, Box } from '@mantine/core';
import { Settings } from 'tabler-icons-react';
import NavMenuUser from '@components/ui/Sidebar/components/NavMenuUser';

interface UserMenuProps {}

const UserMenu: React.FC<UserMenuProps> = () => {
  const router = useRouter();
  const { userInfo, setAuth, setLoggedIn } = useStore(
    (store) => ({
      userInfo: store.userInfo,
      setAuth: store.actions?.setAuth,
      setLoggedIn: store.actions?.setLoggedIn,
    }),
    shallow,
  );

  const onLogout = async () => {
    await StoryStorage.removeItem(STORAGE_KEY.IS_LOGGED_IN_KEY);
    await api.logout().then(() => {
      setAuth?.(null);
      setLoggedIn?.(false);
    });
  };

  const onSetting = () => {
    console.log('onSetting');
  };

  return (
    <Menu
      withArrow
      size="auto"
      placement="start"
      control={<NavMenuUser />}
      className="w-full"
      radius="md"
    >
      <Group align="center" p={12}>
        <Avatar
          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          radius="xl"
        />
        <Box sx={{ flex: 1 }}>
          <Text size="sm" weight={600}>
            Amy
          </Text>
          <Text color="gray" size="xs">
            @Lalosses
          </Text>
        </Box>
      </Group>
      <Divider />
      <Menu.Item icon={<Settings size={14} />} p={12} onClick={onSetting}>
        설정
      </Menu.Item>
      <Menu.Item p={12} onClick={onLogout}>
        <Text
          size="xs"
          component="span"
          style={{ fontFamily: 'Greycliff CF, sans-serif' }}
        >
          @Lalossol 계정에서 로그아웃
        </Text>
      </Menu.Item>
    </Menu>
  );
};

export default UserMenu;
