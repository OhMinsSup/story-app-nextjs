import React from 'react';

// hooks
import { useRouter } from 'next/router';
import { useUserHook } from '@store/hook';

// api
import { api } from '@api/module';

// storage
import { StoryStorage } from '@libs/storage';

// constants
import { STORAGE_KEY } from '@constants/constant';

// components
import { Text, Group, Menu, Divider, Avatar, Box } from '@mantine/core';
import { Settings, UserCircle } from 'tabler-icons-react';
import { getUserThumbnail } from '@utils/utils';
import NavMenuUser from './NavMenuUser';

interface UserMenuProps {}

const UserMenu: React.FC<UserMenuProps> = () => {
  const router = useRouter();
  const { userInfo, setAuth, setLoggedIn } = useUserHook();

  const onLogout = async () => {
    await StoryStorage.removeItem(STORAGE_KEY.IS_LOGGED_IN_KEY);
    await api.logout().then(() => {
      setAuth?.(null);
      setLoggedIn?.(false);
    });
  };

  const onMoveToSetting = () => {
    console.log('onSetting');
  };

  const onMoveToMyPage = () => {
    console.log('onMoveToMyPage');
  };

  const url = getUserThumbnail(userInfo?.profile);

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
        <Avatar src={url} radius="xl" />
        <Box sx={{ flex: 1 }}>
          <Text size="sm" weight={600}>
            {userInfo?.email}
          </Text>
          <Text color="gray" size="xs">
            @{userInfo?.profile?.nickname}
          </Text>
        </Box>
      </Group>
      <Divider />
      <Menu.Item
        icon={<UserCircle size={14} />}
        p={12}
        onClick={onMoveToMyPage}
      >
        마이페이지
      </Menu.Item>
      <Menu.Item icon={<Settings size={14} />} p={12} onClick={onMoveToMyPage}>
        설정
      </Menu.Item>
      <Menu.Item p={12} onClick={onLogout}>
        <Text
          size="xs"
          component="span"
          style={{ fontFamily: 'Greycliff CF, sans-serif' }}
        >
          @{userInfo?.profile?.nickname} 계정에서 로그아웃
        </Text>
      </Menu.Item>
    </Menu>
  );
};

export default UserMenu;
