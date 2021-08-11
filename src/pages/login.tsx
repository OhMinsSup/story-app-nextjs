import React, { useCallback, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import KaytonIcon from "@components/Icon/klaytnIcon";
import { PAGE_ENDPOINTS } from "@contants/contant";

interface LoginPageProps {}
const LoginPage: React.FC<LoginPageProps> = () => {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // redirect to the Main
  const onPageMove = useCallback(() => {
    router.push(PAGE_ENDPOINTS.INDEX);
  }, [router]);

  // If Kaikas is Login
  const onKaikasLogin = useCallback(async () => {
    try {
      if (typeof window.klaytn === "undefined") {
        onOpen();
        const error = new Error();
        error.name = "klaytn Kaikas";
        error.message = "kaikas is undefined";
        throw error;
      }

      const accounts = await window.klaytn.enable();
      const account = accounts[0]; // We currently only ever provide a single account,
      console.log("account", account);
    } catch (error) {
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
            <div className="flex justify-center">
              <button type="button" css={buttonStyles} onClick={onKaikasLogin}>
                <span>Kaikas로 로그인</span>
                <div className="relative float-right">
                  <KaytonIcon />
                </div>
              </button>
            </div>
            <p className="text-sm text-gray-500 my-4 text-center">
              사용 중인 지갑이 없으신가요?
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
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Kaikas 설치</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            로그인을 하려면 Kaikas를 설치해주세요.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              취소
            </Button>
            <Button color="gray.100" colorScheme="blackAlpha" variant="solid">
              Kaikas 설치
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginPage;

const buttonStyles = css`
    width: 400px;
    height: 80px;
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
    padding: 26px 24px;
    text-align: left;
`;
