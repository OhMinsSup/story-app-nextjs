import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { AiOutlineClose, AiOutlineKey } from "react-icons/ai";
import { useRouter } from "next/router";
import { useDisclosure, useToast } from "@chakra-ui/react";

import KaytonIcon from "@components/Icon/klaytnIcon";
import { PAGE_ENDPOINTS } from "src/constants/constant";

import InstalledKaikasModal from "@components/auth/InstalledKaikasModal";
import KeystoreAuthModal from "@components/auth/KeystoreAuthModal";

interface LoginPageProps {}
const LoginPage: React.FC<LoginPageProps> = () => {
  const router = useRouter();
  const toast = useToast();

  const {
    isOpen: keystoreOpen,
    onOpen: onKeystoreOpen,
    onClose: onKeystoreClose,
  } = useDisclosure();

  const {
    isOpen: installedOpen,
    onOpen: onInstalledOpen,
    onClose: onInstalledClose,
  } = useDisclosure();

  // redirect to the Main
  const onPageMove = useCallback(() => {
    router.push(PAGE_ENDPOINTS.INDEX);
  }, [router]);

  // handle Kaikas login auth
  const onKaikasLogin = useCallback(async () => {
    try {
      if (typeof window.klaytn === "undefined") {
        const error = new Error();
        error.name = "klaytn Kaikas";
        error.message = "kaikas is undefined";
        throw error;
      }

      const accounts = await window.klaytn.enable();
      const account = accounts[0]; // We currently only ever provide a single account,
      console.log("account", account);
    } catch (error) {
      if (error.name === "klaytn Kaikas") {
        onInstalledOpen();
        return;
      }

      toast({
        title: "Story는 kaikas로 동작하고 있습니다. 크롬 PC 버전을 이용해주세요.",
        status: "error",
        isClosable: true,
      });
    }
  }, []);

  return (
    <>
      <div
        className="z-50 flex flex-row items-start justify-center h-screen md:pt-20 lg:pt-0 md:items-center"
      >
        <button
          type="button"
          className="absolute top-0 right-0 mt-2 ml-10 button-transparent lg:right-auto lg:left-0 lg:mt-10"
          onClick={onPageMove}
        >
          <AiOutlineClose className="w-8 h-8 fill-current" />
        </button>
        <div
          className="w-full overflow-hidden bg-white border rounded-lg shadow-2xl md:mx-20 lg:w-2/3"
        >
          <div
            className="px-4 py-8 leading-snug lg:w-3/4 lg:mx-auto lg:px-12 lg:py-12"
          >
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
          </div>
        </div>
      </div>
      <InstalledKaikasModal isOpen={installedOpen} onClose={onInstalledClose} />
      <KeystoreAuthModal isOpen={keystoreOpen} onClose={onKeystoreClose} />
    </>
  );
};

export default LoginPage;

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
