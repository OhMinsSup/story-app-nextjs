import React from 'react';
import { DotLoader } from 'react-spinners';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface SignatureLoadingDialogProps {
  loading: boolean;
}
const SignatureLoadingDialog: React.FC<SignatureLoadingDialogProps> = ({
  loading,
}) => {
  return (
    <Dialog open={loading}>
      <DialogTitle className="text-center justify-center flex flex-col">
        Kaikas 서명이 필요합니다.
      </DialogTitle>
      <DialogContent className="text-center space-y-5">
        <div className="w-full flex justify-center">
          <DotLoader />
        </div>

        <div className="font-semibold">
          <span>
            계속 진행하려면 Kaikas 팝업창에서
            <br />
          </span>
          <span>내용을 확인 후 서명을 완료해주세요.</span>
        </div>
        <div className="m-auto text-center font-extralight">
          <div>
            <span>
              (페이지를 이탈할 경우 오류가 발행할 수 있습니다.
              <br />
            </span>
            <span>취소하려면, Kaikas에서 거부를 눌러주세요.)</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignatureLoadingDialog;
