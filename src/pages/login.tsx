import React, { useCallback, useRef, useState } from "react";
import { DotLoader } from "react-spinners";
import { css } from "@emotion/react";
import { AiOutlineKey } from "react-icons/ai";
import { useRouter } from "next/router";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

// components
import KaytonIcon from "@components/Icon/klaytnIcon";
import InstalledKaikasModal from "@components/auth/InstalledKaikasModal";
import KeystoreAuthModal from "@components/auth/KeystoreAuthModal";
import AuthTemplate from "@components/template/AuthTemplate";

// no components
import caver from "@klaytn/caver";
import { existsKlaytn, isAxiosError, signatureMessage } from "@utils/utils";
import { PAGE_ENDPOINTS } from "@constants/constant";

// store
import useWalletSignature from "@store/useWalletSignature";

// api
import { useMutationLogin } from "@api/story/auth";

interface LoginPageProps {}
const LoginPage: React.FC<LoginPageProps> = () => {
  const router = useRouter();
  const toast = useToast();

  // 로그인
  const { mutateAsync } = useMutationLogin();
  const { setWalletSignature } = useWalletSignature();

  // 서명 인증 중 로딩 화면
  const [isSignatureLoading, setSignatureLoading] = useState<boolean>(false);

  // keystore 인증 모달
  const {
    isOpen: keystoreOpen,
    onOpen: onKeystoreOpen,
    onClose: onKeystoreClose,
  } = useDisclosure();

  // 회원가입 이동 모달
  const { isOpen: authOpen, onOpen: onAuthOpen, onClose: onAuthClose } =
    useDisclosure();

  // kaikas 설치 모달
  const {
    isOpen: installedOpen,
    onOpen: onInstalledOpen,
    onClose: onInstalledClose,
  } = useDisclosure();

  // handle Kaikas login auth
  const onKaikasLogin = useCallback(async () => {
    try {
      // Kaikas가 설치가 안된 경우
      if (existsKlaytn) {
        toast({
          title: "Story는 kaikas로 동작하고 있습니다. 크롬 PC 버전을 이용해주세요.",
          status: "error",
          isClosable: true,
        });

        onInstalledOpen();
        return;
      }

      await klaytn.enable();

      // 로딩 시작
      setSignatureLoading(true);

      const walletAddress = klaytn.selectedAddress;
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

      // set wallet signature data
      setWalletSignature(input);
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

  // 회원가입 페이지 이동
  const onMoveToRegister = useCallback(async () => {
    router.push(PAGE_ENDPOINTS.SIGNUP);
  }, []);

  return (
    <>
      <AuthTemplate>
        <h3
          className="mb-10 text-3xl font-bold text-center tracking-tight text-gray-700"
        >
          로그인
        </h3>
        <div className="mb-12 text-center text-gray-600">
          <div>
            <span>
              지갑을 이용하여 KrafterSpace에 로그인합니다.<br />
            </span>
            <span>아래 지갑 중 사용할 지갑을 선택해주세요.</span>
          </div>
        </div>
        <div
          className="flex flex-col justify-center items-center space-y-3"
        >
          <button type="button" css={buttonStyles} onClick={onKaikasLogin}>
            <span>Kaikas로 로그인</span>
            <div className="relative float-right">
              <KaytonIcon />
            </div>
          </button>
          <button
            type="button"
            css={buttonStyles}
            onClick={onKeystoreOpen}
          >
            <span>Keystore로 로그인</span>
            <div className="relative float-right">
              <AiOutlineKey className="w-8 h-8 fill-current" />
            </div>
          </button>
        </div>
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
      </AuthTemplate>
      {/* 설치 모달 */}
      <InstalledKaikasModal isOpen={installedOpen} onClose={onInstalledClose} />
      {/* keystore 인증 */}
      <KeystoreAuthModal isOpen={keystoreOpen} onClose={onKeystoreClose} />
      {/* 서명 처리 */}
      <LoadingAlert loading={isSignatureLoading} />
      {/* 인증 처리 */}
      <RegisterAlert
        loading={authOpen}
        onClose={onAuthClose}
        onMove={onMoveToRegister}
      />
    </>
  );
};

export default LoginPage;

const RegisterAlert: React.FC<
  { loading: boolean; onMove: () => void; onClose: () => void }
> = ({ loading, onClose, onMove }) => {
  const cancelRef = useRef<any>(null);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={loading}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>회원가입이 필요합니다.</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          계속하려면 회원가입을 해주세요.
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            type="button"
            colorScheme="gray"
            ref={cancelRef}
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            type="button"
            colorScheme="purple"
            ml={3}
            onClick={onMove}
          >
            확인
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const LoadingAlert: React.FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={undefined}
      onClose={() => {}}
      isOpen={loading}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent className="h-96">
        <AlertDialogBody className="text-center justify-center flex flex-col">
          <Heading className="mb-4" size="lg">Kaikas 서명이 필요합니다.</Heading>

          <div className="w-full flex justify-center">
            <DotLoader />
          </div>

          <div className="font-semibold mt-4">
            <span>
              계속 진행하려면 Kaikas 팝업창에서<br />
            </span>
            <span>내용을 확인 후 서명을 완료해주세요.</span>
          </div>
        </AlertDialogBody>
        <AlertDialogFooter className="m-auto text-center font-extralight">
          <div>
            <span>
              (페이지를 이탈할 경우 오류가 발행할 수 있습니다.<br />
            </span>
            <span>취소하려면, Kaikas에서 거부를 눌러주세요.)</span>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const buttonStyles = css`
    width: 400px;
    height: 60px;
    font-weight: 700;
    font-size: 16px;
    line-height: 28px;
    color: rgba(45,55,65,.7);
    background-color: #fff;
    border: 1px solid #aab4be;
    box-sizing: border-box;
    box-shadow: 0 4px 8px rgb(0 0 0 / 8%);
    border-radius: 4px;
    vertical-align: middle;
    padding: 0 24px;
    text-align: left;
    &:hover {
      background-color: var(--hover);
    }
`;
