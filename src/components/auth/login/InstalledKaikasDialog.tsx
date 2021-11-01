import React, { useCallback } from 'react';
import shallow from 'zustand/shallow';

// components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

// store
import { useStore } from '@store/store';

// hooks
import useUAParser from '@hooks/useParser';

const InstalledKaikasDialog: React.FC = () => {
  const { open, setInstallKaiKas } = useStore(
    (store) => ({
      open: store.installedKaikas,
      setInstallKaiKas: store.actions?.setInstallKaiKas,
    }),
    shallow,
  );

  const ua = useUAParser();

  const onClick = useCallback(() => {
    const url =
      'https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi';
    const win = window.open(url, '_blank');
    if (!win) return;
    win.focus();
  }, []);

  const onClose = useCallback(() => {
    setInstallKaiKas?.(false);
  }, [setInstallKaiKas]);

  const isChrome = ua.getBrowser().name === 'Chrome';

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>Kaikas 설치</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isChrome ? (
            <> 로그인을 하려면 Kaikas를 설치해주세요.</>
          ) : (
            <>
              Story는 kaikas로 동작하고 있습니다. 크롬 PC 버전을 이용해주세요.
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size="medium"
          variant="outlined"
          color="secondary"
          autoFocus
          onClick={onClose}
        >
          {isChrome ? '취소' : '닫기'}
        </Button>
        {isChrome && (
          <Button
            size="medium"
            variant="contained"
            color="info"
            onClick={onClick}
          >
            Kaikas 설치
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default InstalledKaikasDialog;
