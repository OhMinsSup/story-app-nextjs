import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

// components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// icons
import LoadingButton from '@mui/lab/LoadingButton';
import VpnKey from '@mui/icons-material/VpnKey';
import ArrowBack from '@mui/icons-material/ArrowBack';

// components
import SignatureLoadingDialog from '@components/auth/SignatureLoadingDialog';
import KaytonIcon from '@components/icon/klaytnIcon';
import InstalledKaikasModal from '@components/auth/InstalledKaikasModal';
import SignupDialog from '@components/auth/SignupDialog';
import KeystoreAuthModal from '@components/auth/KeystoreAuthModal';

// no components
import caver from '@klaytn/caver';
import { PAGE_ENDPOINTS } from '@constants/constant';
import { existsKlaytn, isAxiosError, signatureMessage } from '@utils/utils';

// api
import { useMutationLogin } from '@api/story/auth';

interface LoginPageProps {}
const LoginPage: React.FC<LoginPageProps> = () => {
  const router = useRouter();
  // 로그인
  const { mutateAsync } = useMutationLogin();

  // 서명 인증 중 로딩 화면
  const [isSignatureLoading, setSignatureLoading] = useState<boolean>(false);
  // 회원가입 이동 모달
  const [isReigsterOpen, setRegisterOpen] = useState<boolean>(false);
  // kaikas 설치 모달
  const [isInstallOpen, setInstallOpen] = useState<boolean>(false);
  // keystore 인증 모달
  const [isKeystoreOpen, setKeystoreOpen] = useState<boolean>(false);
  // snackbar
  const [showSnackbar, setSnackbar] = React.useState(false);

  const onSnackbarClose = useCallback(
    (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setSnackbar(false);
    },
    [],
  );

  // handle Kaikas login auth
  const onKaikasLogin = useCallback(async () => {
    try {
      // Kaikas가 설치가 안된 경우
      if (existsKlaytn) {
        setSnackbar(true);
        setInstallOpen(true);
        return;
      }

      const accounts = await klaytn.enable();

      // 로딩 시작
      setSignatureLoading(true);

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
        timestamp,
        signature: signedMessage,
      };

      const {
        data: { ok },
      } = await mutateAsync(input);

      setSignatureLoading(false);

      if (ok) {
        router.replace(PAGE_ENDPOINTS.INDEX);
      }
    } catch (error) {
      // 로딩 종료
      setSignatureLoading(false);

      console.error(error);
      // 서버 에러
      if (isAxiosError(error)) {
        const {
          response: { data },
        } = error;
        if (!data.ok) setRegisterOpen(true);
      }
    }
  }, []);

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
            onClick={() => router.replace(PAGE_ENDPOINTS.INDEX)}
          >
            <ArrowBack />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
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
              onClick={() => setKeystoreOpen(true)}
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
      </Container>
      <KeystoreAuthModal
        isOpen={isKeystoreOpen}
        onClose={() => setKeystoreOpen(false)}
      />
      <InstalledKaikasModal
        isOpen={isInstallOpen}
        onClose={() => setInstallOpen(false)}
      />
      <SignatureLoadingDialog loading={isSignatureLoading} />
      <SignupDialog
        enabled={isReigsterOpen}
        onClose={() => setRegisterOpen(false)}
      />
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={onSnackbarClose}
      >
        <Alert
          onClose={onSnackbarClose}
          severity="error"
          sx={{ width: '100%' }}
        >
          Story는 kaikas로 동작하고 있습니다. 크롬 PC 버전을 이용해주세요.
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginPage;
