import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import NoSsr from '@mui/material/NoSsr';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';

// icons
import SearchIcon from '@mui/icons-material/Search';

// store
import { useStore } from '@store/store';

// utils
import { PAGE_ENDPOINTS } from '@constants/constant';
import { getUserThumbnail } from '@utils/utils';
import { useMutationLogout } from '@api/story/auth';
import { useNotificationContext } from '@contexts/notification/context';

interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = () => {
  const router = useRouter();
  const userInfo = useStore((store) => store.userInfo, shallow);
  const mutate = useMutationLogout();
  const { notification } = useNotificationContext();
  const [isOpen, setOpen] = useState(false);

  const onAuthPage = () => {
    setOpen(false);
    router.push(PAGE_ENDPOINTS.LOGIN);
  };

  const onPublishPage = () => {
    setOpen(false);
    router.push(PAGE_ENDPOINTS.PUBLISH.ROOT);
  };

  const onSearchPage = () => {
    setOpen(false);
    router.push(PAGE_ENDPOINTS.SEARCH.ROOT);
  };

  const onUserProfilePage = () => {
    setOpen(false);
    if (!userInfo) return;
    router.push(PAGE_ENDPOINTS.PROFILE.DETAIL(userInfo.id));
  };

  const onLogout = async () => {
    await mutate.mutateAsync();
    router.push(PAGE_ENDPOINTS.INDEX);
  };

  const renderDrawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem alignItems="flex-start" button onClick={onUserProfilePage}>
          <ListItemAvatar>
            <Avatar
              src={getUserThumbnail({
                defaultProfile: !!userInfo?.profile.defaultProfile,
                avatarSvg: userInfo?.profile.avatarSvg,
                profileUrl: userInfo?.profile.profileUrl,
                nickname: userInfo?.profile.nickname,
              })}
              alt={userInfo?.profile.nickname}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography className="font-bold" component="p" variant="body2">
                {userInfo?.profile.nickname}
              </Typography>
            }
            secondary={
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                className="font-bold text-blue-300 text-xs"
                variant="body2"
                color="info"
              >
                프로필 관리
              </Typography>
            }
          />
        </ListItem>
        <Divider />
        <ListItem button onClick={onSearchPage}>
          <ListItemText
            primary={
              <Typography
                className="font-bold"
                sx={{ display: 'inline' }}
                variant="body2"
                color="info"
              >
                검색
              </Typography>
            }
          />
        </ListItem>
        <ListItem button onClick={onPublishPage}>
          <ListItemText
            primary={
              <Typography
                className="font-bold"
                sx={{ display: 'inline' }}
                variant="body2"
                color="info"
              >
                발행하기
              </Typography>
            }
          />
        </ListItem>
        <Divider />
        <ListItem button onClick={onLogout}>
          <ListItemText
            primary={
              <Typography
                className="font-bold"
                sx={{ display: 'inline' }}
                variant="body2"
                color="info"
              >
                로그아웃
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" className="shadow-none" color="transparent">
        <Toolbar>
          <Link href={PAGE_ENDPOINTS.INDEX}>
            <a>
              <div className="font-sans text-base">Story</div>
            </a>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: 'flex' } }}>
            <div
              className="inline-block align-middle space-x-5"
              suppressHydrationWarning
            >
              {userInfo ? (
                <>
                  <IconButton
                    size="large"
                    edge={false}
                    sx={{ border: 'none' }}
                    className="border-none"
                    aria-label="search icon button"
                    aria-haspopup="true"
                    onClick={onSearchPage}
                    color="inherit"
                  >
                    <SearchIcon />
                  </IconButton>
                  <NoSsr>
                    <IconButton
                      size="large"
                      edge={false}
                      sx={{ border: 'none' }}
                      className="border-none"
                      aria-label="account of current user"
                      aria-haspopup="true"
                      onClick={() => setOpen(true)}
                      color="inherit"
                    >
                      <Avatar
                        src={getUserThumbnail({
                          defaultProfile: userInfo.profile.defaultProfile,
                          avatarSvg: userInfo.profile.avatarSvg,
                          profileUrl: userInfo.profile.profileUrl,
                          nickname: userInfo.profile.nickname,
                        })}
                        alt={userInfo.profile.nickname}
                      />
                    </IconButton>
                  </NoSsr>
                </>
              ) : (
                <>
                  <IconButton
                    size="large"
                    edge={false}
                    sx={{ border: 'none' }}
                    className="border-none"
                    aria-label="search icon button"
                    aria-haspopup="true"
                    onClick={onSearchPage}
                    color="inherit"
                  >
                    <SearchIcon />
                  </IconButton>
                  <Button
                    size="medium"
                    variant="outlined"
                    color="secondary"
                    onClick={onAuthPage}
                  >
                    인증하기
                  </Button>
                  {/* Push Test */}
                  {/* <Button
                    size="medium"
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      notification.notification();
                      console.log('test');
                    }}
                  >
                    푸시
                  </Button>
                  <Button
                    size="medium"
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      notification.subscribe();
                      console.log('test');
                    }}
                  >
                    구독
                  </Button>
                  <Button
                    size="medium"
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      notification.unsubscribe();
                      console.log('test');
                    }}
                  >
                    구독취소
                  </Button> */}
                  {/* Push Test */}
                </>
              )}
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={isOpen} onClose={() => setOpen(false)}>
        {renderDrawer}
      </Drawer>
    </>
  );
};

export default Navbar;
