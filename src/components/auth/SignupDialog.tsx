import React, { useCallback } from "react";
import { useRouter } from "next/router";

// components
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

// no components
import { PAGE_ENDPOINTS } from "@constants/constant";

interface SignupDialogProps {
  enabled: boolean;
  onClose: () => void;
}
const SignupDialog: React.FC<SignupDialogProps> = ({ enabled, onClose }) => {
  const router = useRouter();

  // 회원가입 페이지 이동
  const onMoveToRegister = useCallback(() => {
    router.push(PAGE_ENDPOINTS.SIGNUP);
  }, []);

  return (
    <Dialog
      open={enabled}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        회원가입
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          계속하려면 회원가입을 해주세요.
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
          onClick={onMoveToRegister}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignupDialog;
