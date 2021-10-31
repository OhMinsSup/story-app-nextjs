import React from 'react';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';

// components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// icons
import LoadingButton from '@mui/lab/LoadingButton';
import VpnKey from '@mui/icons-material/VpnKey';

// components
import KaytonIcon from '@components/icon/klaytnIcon';
import AuthLayout from '@components/auth/login/AuthLayout';

// no components
import caver from '@libs/klaytn/caver';
import { PAGE_ENDPOINTS, RESULT_CODE } from '@constants/constant';
import { existsKlaytn, isAxiosError, signatureMessage } from '@utils/utils';

// api
import { useMutationLogin } from '@api/story/auth';

// store
import { useStore } from '@store/store';

const LoginPage: React.FC = () => {
  const router = useRouter();
  // 로그인
  const { mutateAsync } = useMutationLogin();
  const { isSignatureLoading, actions } = useStore(
    (store) => ({
      actions: store.actions,
      isSignatureLoading: store.kaikasSignature,
    }),
    shallow,
  );

  const onKeystoreLogin = () => {
    actions?.setIsKeystoreLogin(true);
  };

  // handle Kaikas login auth
  const onKaikasLogin = async () => {
    try {
      // Kaikas가 설치가 안된 경우
      if (existsKlaytn) {
        actions?.setInstallKaiKas?.(true);
        return;
      }

      const accounts = await klaytn.enable();

      // 로딩 시작
      actions?.setSignatureLogin?.(true);

      const walletAddress = accounts[0];
      const timestamp = Date.now();
      const requestType = 'LoginRequest';

      const signedMessage = await caver?.klay.sign(
        signatureMessage(walletAddress, timestamp, requestType),
        walletAddress,
      );

      if (!signedMessage) {
        throw new Error('signature error');
      }

      const input = {
        walletAddress,
        signature: signedMessage,
      };

      const {
        data: { ok, resultCode, result },
      } = await mutateAsync(input);

      actions?.setSignatureLogin?.(false);

      switch (resultCode) {
        case RESULT_CODE.OK:
          router.replace(PAGE_ENDPOINTS.INDEX);
          break;
        case RESULT_CODE.NOT_EXIST:
          actions?.setSignup?.(true);
          actions?.setTokenNAddress?.({
            walletAddress,
            signatureToken: result as string,
          });
          break;
        default:
          break;
      }
    } catch (error) {
      // 로딩 종료
      actions?.setSignatureLogin?.(false);

      console.error(error);
      // 서버 에러
      if (!isAxiosError(error)) return;
      const {
        response: { data },
      } = error;
      if (!data.ok) actions?.setSignup?.(true);
    }
  };

  return (
    <>
      <AuthLayout>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            className="font-bold text-center tracking-tight text-gray-700"
            component="h1"
            variant="h5"
          >
            로그인
          </Typography>
          <div className="my-6 text-center text-gray-600">
            <div>
              <span>
                지갑을 이용하여 KrafterSpace에 로그인합니다.
                <br />
              </span>
              <span>아래 지갑 중 사용할 지갑을 선택해주세요.</span>
            </div>
          </div>
          <Box className="space-y-4" component="div" sx={{ mt: 1 }}>
            <LoadingButton
              color="primary"
              size="large"
              onClick={onKaikasLogin}
              loading={isSignatureLoading}
              loadingPosition="start"
              startIcon={<KaytonIcon />}
              variant="contained"
              fullWidth
            >
              Kaikas로 로그인
            </LoadingButton>

            <LoadingButton
              color="primary"
              size="large"
              onClick={onKeystoreLogin}
              loadingPosition="start"
              startIcon={<VpnKey />}
              variant="contained"
              className="w-full"
              fullWidth
            >
              키스토어로 로그인
            </LoadingButton>
          </Box>
          <p className="text-sm text-gray-500 my-4 text-center">
            <span>사용 중인 지갑이 없으신가요?</span>
            <a
              rel="noreferrer"
              target="_blank"
              className="underline mx-1"
              href="https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi"
            >
              Kaikas 다운로드
            </a>
          </p>
        </Box>
      </AuthLayout>
    </>
  );
};

export default LoginPage;
