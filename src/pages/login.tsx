import React, { useCallback, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

// components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// icons
import LoadingButton from "@mui/lab/LoadingButton";
import VpnKey from "@mui/icons-material/VpnKey";

// components
import SignatureLoadingDialog from "@components/auth/SignatureLoadingDialog";
import KaytonIcon from "@components/icon/klaytnIcon";
import InstalledKaikasModal from "@components/auth/InstalledKaikasModal";
import SignupDialog from "@components/auth/SignupDialog";
import KeystoreAuthModal from "@components/auth/KeystoreAuthModal";

// no components
import caver from "@klaytn/caver";
import { existsKlaytn, isAxiosError, signatureMessage } from "@utils/utils";

// api
import { useMutationLogin } from "@api/story/auth";

interface LoginPageProps {}
const LoginPage: React.FC<LoginPageProps> = () => {
  // 로그인
  const { mutateAsync } = useMutationLogin();

  // 서명 인증 중 로딩 화면
  const [isSignatureLoading, setSignatureLoading] = useState<boolean>(false);

  // 회원가입 이동 모달
  const { onOpen: onAuthOpen } = useDisclosure();

  // kaikas 설치 모달
  const {
    onOpen: onInstalledOpen,
  } = useDisclosure();

  // handle Kaikas login auth
  const onKaikasLogin = useCallback(async () => {
    try {
      // Kaikas가 설치가 안된 경우
      if (existsKlaytn) {
        onInstalledOpen();
        return;
      }

      const accounts = await klaytn.enable();

      // 로딩 시작
      setSignatureLoading(true);

      const walletAddress = accounts[0];
      const timestamp = Date.now();
      const requestType = "LoginRequest";

      const signedMessage = await caver?.klay.sign(
        signatureMessage(walletAddress, timestamp, requestType),
        walletAddress,
      );

      if (!signedMessage) {
        throw new Error("signature error");
      }

      const input = {
        walletAddress,
        timestamp,
        signature: signedMessage,
      };

      await mutateAsync(input);
    } catch (error) {
      console.error(error);
      // 서버 에러
      if (isAxiosError(error)) {
        const { response: { data } } = error;
        if (!data.ok) onAuthOpen();
      }
    } finally {
      // 로딩 종류
      setSignatureLoading(false);
    }
  }, []);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
                지갑을 이용하여 KrafterSpace에 로그인합니다.<br />
              </span>
              <span>아래 지갑 중 사용할 지갑을 선택해주세요.</span>
            </div>
          </div>
          <Box className="space-y-4" component="div" sx={{ mt: 1 }}>
            <LoadingButton
              color="primary"
              size="large"
              onClick={() => {}}
              loading={false}
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
              onClick={() => {}}
              loading={false}
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
      <KeystoreAuthModal isOpen={false} onClose={() => {}} />
      <InstalledKaikasModal isOpen={false} onClose={() => {}} />
      <SignatureLoadingDialog loading={false} />
      <SignupDialog enabled={false} onClose={() => {}} />
    </>
  );
};

export default LoginPage;
