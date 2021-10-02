import React, { useCallback } from 'react';

// components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

interface InstalledKaikasModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const InstalledKaikasModal: React.FC<InstalledKaikasModalProps> = ({
  isOpen,
  onClose,
}) => {
  const onClick = useCallback(() => {
    const url =
      'https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi';
    const win = window.open(url, '_blank');
    if (!win) return;
    win.focus();
  }, []);

  return (
    <Dialog open={isOpen} maxWidth="sm" fullWidth>
      <DialogTitle>Kaikas 설치</DialogTitle>
      <DialogContent>
        <DialogContentText>
          로그인을 하려면 Kaikas를 설치해주세요.
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
          취소
        </Button>
        <Button
          size="medium"
          variant="contained"
          color="info"
          onClick={onClick}
        >
          Kaikas 설치
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InstalledKaikasModal;
