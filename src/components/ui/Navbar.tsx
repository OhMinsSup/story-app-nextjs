import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { alpha, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import NoSsr from '@mui/material/NoSsr';

// icons
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';

// store
import useAuth from '@store/useAuth';

// utils
import { blueGrey } from '@mui/material/colors';
import { PAGE_ENDPOINTS } from '@constants/constant';
import { getUserThumbnail } from '@utils/utils';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.black,
  '& .MuiInputBase-input': {
    backgroundColor: alpha(blueGrey[200], 0.15),
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  padding: theme.spacing(1),
}));

const mobileMenuId = 'primary-search-account-menu-mobile';
const menuId = 'primary-search-account-menu';

interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = () => {
  const router = useRouter();
  const { userInfo } = useAuth();

  const onAuthPage = useCallback(() => {
    router.push(PAGE_ENDPOINTS.LOGIN);
  }, [router]);

  const onPublish = useCallback(() => {
    router.push(PAGE_ENDPOINTS.PUBLISH);
  }, [router]);

  const renderMobileMenu = (
    <Menu
      anchorEl={null}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={false}
      onClose={() => {}}
    >
      <MenuItem onClick={() => {}}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderMenu = (
    <Menu
      anchorEl={null}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={false}
      onClose={() => {}}
    >
      <MenuItem onClick={() => {}}>Profile</MenuItem>
      <MenuItem onClick={() => {}}>My account</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="static" className="shadow-sm" color="transparent">
        <Toolbar>
          <Div>Story</Div>
          <Box sx={{ flexGrow: 1 }} />
          <Search sx={{ display: { xs: 'none', md: 'flex' } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="검색"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <div
              className="inline-block mx-3 align-middle p-2 space-x-5"
              suppressHydrationWarning
            >
              {userInfo ? (
                <>
                  <NoSsr>
                    <IconButton
                      size="large"
                      edge={false}
                      sx={{ border: 'none' }}
                      className="border-none"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={() => {}}
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
                  <Button
                    size="medium"
                    variant="outlined"
                    color="secondary"
                    suppressHydrationWarning
                    onClick={onPublish}
                  >
                    발행하기
                  </Button>
                </>
              ) : (
                <Button
                  size="medium"
                  variant="outlined"
                  color="secondary"
                  onClick={onAuthPage}
                >
                  인증하기
                </Button>
              )}
            </div>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={() => {}}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
};

export default Navbar;
