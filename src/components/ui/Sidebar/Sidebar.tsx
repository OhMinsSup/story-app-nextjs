import React from 'react';

// hooks
import { useRouter } from 'next/router';
import { useStore } from '@store/store';
import shallow from 'zustand/shallow';

// api
import { api } from '@api/module';

// constants
import { PAGE_ENDPOINTS, STORAGE_KEY } from '@constants/constant';

// storage
import { StoryStorage } from '@libs/storage';

// components
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Group,
  Avatar,
  Menu,
} from '@mantine/core';

// icons
import { MantineLogoSmall } from '@components/ui/Logo';
import {
  Icon as TablerIcon,
  Home2,
  User,
  Brush,
  Settings,
  Logout,
  Search,
  Login,
} from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" withArrow transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon />
      </UnstyledButton>
    </Tooltip>
  );
}

const Sidebar = () => {
  const router = useRouter();
  const { userInfo, setAuth, setLoggedIn } = useStore(
    (store) => ({
      userInfo: store.userInfo,
      setAuth: store.actions?.setAuth,
      setLoggedIn: store.actions?.setLoggedIn,
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

  const onMoveToProfile = () => {
    if (!userInfo) return;
    router.push(PAGE_ENDPOINTS.PROFILE.DETAIL(userInfo.id));
  };

  const onMoveToLogin = () => {
    router.push(PAGE_ENDPOINTS.LOGIN);
  };

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
    <Navbar height={'100vh'} width={{ base: 80 }} p="md">
      <Center>
        <MantineLogoSmall />
      </Center>
      <Navbar.Section grow mt={50}>
        <Group direction="column" align="center" spacing={0}>
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
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        {!userInfo ? (
          <Group direction="column" align="center" spacing={0}>
            <NavbarLink icon={Settings} label="설명" onClick={onSetting} />
            <NavbarLink icon={Login} label="로그인" onClick={onMoveToLogin} />
          </Group>
        ) : (
          <Group direction="column" align="center" spacing={0}>
            <NavbarLink icon={Settings} label="설명" onClick={onSetting} />
            <Menu
              withArrow
              placement="start"
              control={
                <Tooltip
                  label="계정"
                  position="right"
                  withArrow
                  transitionDuration={0}
                >
                  <Avatar
                    src={
                      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80'
                    }
                    radius="xl"
                  />
                </Tooltip>
              }
            >
              ?
            </Menu>
          </Group>
        )}
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
