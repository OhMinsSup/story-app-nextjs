import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { AiOutlineKey } from "react-icons/ai";
import { useDisclosure, useToast } from "@chakra-ui/react";

import KaytonIcon from "@components/Icon/klaytnIcon";

import InstalledKaikasModal from "@components/auth/InstalledKaikasModal";
import KeystoreAuthModal from "@components/auth/KeystoreAuthModal";
import AuthTemplate from "@components/template/AuthTemplate";

interface LoginPageProps {}
const LoginPage: React.FC<LoginPageProps> = () => {
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

  // handle Kaikas login auth
  const onKaikasLogin = useCallback(async () => {
    try {
      if (typeof window.klaytn === "undefined") {
        const error = new Error();
        error.name = "klaytn Kaikas";
        error.message = "kaikas is undefined";
        throw error;
      }

      // Kaikas가 설치가 안된 경우
      if (!window.klaytn.isKaikas) {
        onInstalledOpen();
        return;
      }

      const accounts = await window.klaytn.enable();
      console.log("accounts", accounts);
      const address = accounts[0]; // We currently only ever provide a single account,

      // const klaytn = caver.klay.accounts.create();
      // console.log("klaytn", {
      //   address: klaytn.address,
      //   privateKey: klaytn.privateKey,
      // });
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
