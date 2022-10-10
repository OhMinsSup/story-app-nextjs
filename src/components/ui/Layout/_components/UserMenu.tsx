import React, { useCallback } from 'react';

// hooks
import { useRouter } from 'next/router';
import { useMeQuery } from '@api/queries';
import { useLogoutMutation } from '@api/mutations';

// constants
import { PAGE_ENDPOINTS } from '@constants/constant';

// components
import { Text, Menu, useMantineColorScheme } from '@mantine/core';
import { Settings, UserCircle, Brush, Sun, Moon } from 'tabler-icons-react';
import { UniversalButton } from '@components/ui/Button';
import UserAvatar from './UserAvatar';

const UserMenu = () => {
  const router = useRouter();
  const { userInfo } = useMeQuery();
  const { mutateAsync } = useLogoutMutation();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const onToggleColorScheme = useCallback(() => {
    toggleColorScheme();
  }, [toggleColorScheme]);

  const onLogout = useCallback(() => {
    mutateAsync();
  }, [mutateAsync]);

  const onMoveToSetting = useCallback(() => {
    console.log('onSetting');
  }, []);

  const onMoveToMyPage = useCallback(() => {
    console.log('onMoveToMyPage');
  }, []);

  const onMoveToPublish = useCallback(() => {
    router.push(PAGE_ENDPOINTS.NFT.REGIST);
  }, [router]);

  const onMoveToLogin = useCallback(() => {
    router.push(PAGE_ENDPOINTS.AUTH.SIGNIN);
  }, [router]);

  if (!userInfo) {
    return (
      <UniversalButton onClick={onMoveToLogin}>
        <UserAvatar />
      </UniversalButton>
    );
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UserAvatar userInfo={userInfo} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={<UserCircle size={14} />}
          p={12}
          onClick={onMoveToMyPage}
        >
          마이페이지
        </Menu.Item>
        <Menu.Item
          icon={<Settings size={14} />}
          p={12}
          onClick={onMoveToSetting}
        >
          설정
        </Menu.Item>
        <Menu.Item icon={<Brush size={14} />} p={12} onClick={onMoveToPublish}>
          발행하기
        </Menu.Item>
        <Menu.Item
          icon={colorScheme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          p={12}
          onClick={onToggleColorScheme}
        >
          {colorScheme === 'dark' ? '라이트 모드' : '다크 모드'}
        </Menu.Item>
        <Menu.Item p={12} onClick={onLogout}>
          <Text
            size="xs"
            component="span"
            style={{ fontFamily: 'Greycliff CF, sans-serif' }}
          >
            @{userInfo?.username} 계정에서 로그아웃
          </Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
