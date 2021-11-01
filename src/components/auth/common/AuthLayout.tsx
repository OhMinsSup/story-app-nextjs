import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// components
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

// constants
import { PAGE_ENDPOINTS } from '@constants/constant';

// icons
import ArrowBack from '@mui/icons-material/ArrowBack';

const InstallKaikasDialog = dynamic(
  () => import('@components/auth/login/InstalledKaikasDialog'),
  {
    ssr: false,
  },
);

const SignatureDialog = dynamic(
  () => import('@components/auth/login/SignatureDialog'),
  {
    ssr: false,
  },
);

const SignupDialog = dynamic(
  () => import('@components/auth/signup/SignupDialog'),
  {
    ssr: false,
  },
);

const KeystoreLoginDialog = dynamic(
  () => import('@components/auth/login/KeystoreLoginDialog'),
  {
    ssr: false,
  },
);

const AuthLayout: React.FC = ({ children }) => {
  const router = useRouter();

  const onMoveBack = useCallback(() => {
    router.replace(PAGE_ENDPOINTS.INDEX);
  }, [router]);

  return (
    <>
      <AppBar position="static" className="shadow-none" color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="back press button"
            aria-haspopup="false"
            color="inherit"
            onClick={onMoveBack}
          >
            <ArrowBack />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        {children}
      </Container>
      <InstallKaikasDialog />
      <SignatureDialog />
      <SignupDialog />
      <KeystoreLoginDialog />
    </>
  );
};

export default AuthLayout;
