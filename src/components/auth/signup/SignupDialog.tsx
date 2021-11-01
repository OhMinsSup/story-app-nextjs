import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

// components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

// no components
import { PAGE_ENDPOINTS } from '@constants/constant';

// store
import { useStore } from '@store/store';

const SignupDialog: React.FC = () => {
  const router = useRouter();
  const { isOpen, setSignup } = useStore(
    (store) => ({
      isOpen: store.isSignup,
      setSignup: store.actions?.setSignup,
    }),
    shallow,
  );

  // 회원가입 페이지 이동
  const onMoveToRegister = useCallback(() => {
    router.push(PAGE_ENDPOINTS.SIGNUP);
  }, [router]);

  const onClose = useCallback(() => {
    setSignup?.(false);
  }, [setSignup]);

  return (
    <Dialog open={isOpen} maxWidth="sm" fullWidth>
      <DialogTitle>회원가입</DialogTitle>
      <DialogContent>
        <DialogContentText>계속하려면 회원가입을 해주세요.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size="medium"
          variant="outlined"
          color="secondary"
          autoFocus
          onClick={onClose}
        >
          취소
        </Button>
        <Button
          size="medium"
          variant="contained"
          color="info"
          onClick={onMoveToRegister}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignupDialog;
