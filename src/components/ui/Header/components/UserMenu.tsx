import React from 'react';

// hooks
import { useRouter } from 'next/router';
import { useMeQuery } from '@api/queries';

// api
import { api } from '@api/module';

// constants
import { PAGE_ENDPOINTS } from '@constants/constant';

// components
import { Text, Group, Menu, Divider, Avatar, Box } from '@mantine/core';
import { Settings, UserCircle, Brush } from 'tabler-icons-react';
import { getUserThumbnail } from '@utils/utils';

// types
import type { MenuProps } from '@mantine/core';

interface UserMenuProps extends Pick<MenuProps, 'control'> {}

const UserMenu: React.FC<UserMenuProps> = (props) => {
  const router = useRouter();
  const { userInfo } = useMeQuery();

  const onLogout = async () => {
    await api.logout();
  };

  const onMoveToSetting = () => {
    console.log('onSetting');
  };

  const onMoveToMyPage = () => {
    console.log('onMoveToMyPage');
  };

  const onMoveToPublish = () => {
    router.push(PAGE_ENDPOINTS.NFT.REGIST);
  };

  const url = getUserThumbnail(userInfo?.profile);

  return (
    <Menu
      withArrow
      size="md"
      placement="end"
      control={props.control}
      radius="md"
    >
      <Group align="center" p={12}>
        <Avatar src={url} radius="xl" />
        <Box sx={{ flex: 1 }}>
          <Text size="sm" weight={600}>
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
      <Menu.Item icon={<Settings size={14} />} p={12} onClick={onMoveToSetting}>
        설정
      </Menu.Item>
      <Menu.Item icon={<Brush size={14} />} p={12} onClick={onMoveToPublish}>
        발행하기
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
