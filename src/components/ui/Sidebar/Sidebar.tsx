import React from 'react';

// shallow
import shallow from 'zustand/shallow';

// hooks
import { useRouter } from 'next/router';
import { useStore } from '@store/store';
import { useMediaQuery } from '@mantine/hooks';

// constants
import { PAGE_ENDPOINTS } from '@constants/constant';

// components
import { Navbar, Group } from '@mantine/core';
import NavbarLink from '@components/ui/Header/components/NavbarLink';
import UserMenu from '@components/ui/Header/components/Menu';

// icons
import { Home2, User, Brush, Search, Login, Hash } from 'tabler-icons-react';

const Sidebar = () => {
  const smallScreen = useMediaQuery('(max-width: 768px)');

  const router = useRouter();
  const { userInfo } = useStore(
    (store) => ({
      userInfo: store.userInfo,
    }),
    shallow,
  );

  const onMoveToHome = () => {
    if (router.pathname === '/') {
      router.replace(PAGE_ENDPOINTS.INDEX);
      return;
    }
    router.push(PAGE_ENDPOINTS.INDEX);
  };

  const onMoveToPublish = () => {
    router.push(PAGE_ENDPOINTS.PUBLISH.ROOT);
  };

  const onMoveToSearch = () => {
    router.push(PAGE_ENDPOINTS.SEARCH.ROOT);
  };

  const onMoveToTag = () => {
    router.push(PAGE_ENDPOINTS.TAGS.ROOT);
  };

  const onMoveToProfile = () => {
    if (!userInfo) return;
    router.push(PAGE_ENDPOINTS.PROFILE.DETAIL(userInfo.id));
  };

  const onMoveToLogin = () => {
    router.push(PAGE_ENDPOINTS.LOGIN);
  };

  return (
    <Navbar height={'calc(100vh - 60px)'} width={{ base: 80, sm: 250 }} p="md">
      <Navbar.Section grow mt={10}>
        <Group direction="column" align="center" spacing={0}>
          {smallScreen ? (
            <>
              <NavbarLink
                icon={Home2}
                label="홈"
                active={router.pathname === PAGE_ENDPOINTS.INDEX}
                onClick={onMoveToHome}
              />
              <NavbarLink
                icon={Search}
                label="검색"
                active={router.pathname === PAGE_ENDPOINTS.SEARCH.ROOT}
                onClick={onMoveToSearch}
              />
              <NavbarLink
                icon={Hash}
                label="태그"
                active={router.pathname === PAGE_ENDPOINTS.TAGS.ROOT}
                onClick={onMoveToTag}
              />
              {userInfo && (
                <>
                  <NavbarLink
                    icon={User}
                    label="프로필"
                    active={router.pathname === PAGE_ENDPOINTS.PROFILE.ROOT}
                    onClick={onMoveToProfile}
                  />
                  <NavbarLink
                    icon={Brush}
                    label="발행하기"
                    active={router.pathname === PAGE_ENDPOINTS.PUBLISH.ROOT}
                    onClick={onMoveToPublish}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <NavbarLink.Desktop
                icon={Home2}
                label="홈"
                active={router.pathname === PAGE_ENDPOINTS.INDEX}
                onClick={onMoveToHome}
              />
              <NavbarLink.Desktop
                icon={Search}
                label="검색"
                active={router.pathname === PAGE_ENDPOINTS.SEARCH.ROOT}
                onClick={onMoveToSearch}
              />
              <NavbarLink.Desktop
                icon={Hash}
                label="태그"
                active={router.pathname === PAGE_ENDPOINTS.TAGS.ROOT}
                onClick={onMoveToTag}
              />
              {userInfo && (
                <>
                  <NavbarLink.Desktop
                    icon={User}
                    label="프로필"
                    active={router.pathname === PAGE_ENDPOINTS.PROFILE.ROOT}
                    onClick={onMoveToProfile}
                  />
                  <NavbarLink.Desktop
                    icon={Brush}
                    label="발행하기"
                    active={router.pathname === PAGE_ENDPOINTS.PUBLISH.ROOT}
                    onClick={onMoveToPublish}
                  />
                </>
              )}
            </>
          )}
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        {!userInfo ? (
          <Group direction="column" align="center" spacing={0}>
            {smallScreen ? (
              <NavbarLink icon={Login} label="로그인" onClick={onMoveToLogin} />
            ) : (
              <NavbarLink.Desktop
                icon={Login}
                label="로그인"
                onClick={onMoveToLogin}
              />
            )}
          </Group>
        ) : (
          <Group direction="column" align="center" spacing={0}>
            <UserMenu />
          </Group>
        )}
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
