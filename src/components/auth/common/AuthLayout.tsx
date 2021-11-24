import React from 'react';
import { useRouter } from 'next/router';

// components
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

// icons
import ArrowBack from '@mui/icons-material/ArrowBack';

const AuthLayout: React.FC = ({ children }) => {
  const router = useRouter();

  const onMoveBack = () => {
    router.back();
  };

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
    </>
  );
};

export default AuthLayout;
