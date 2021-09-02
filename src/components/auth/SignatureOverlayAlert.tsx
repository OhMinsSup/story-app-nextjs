import React from "react";
import { DotLoader } from "react-spinners";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Heading,
} from "@chakra-ui/react";
import type { FocusableElement } from "@chakra-ui/utils";

const SignatureOverlayAlert: React.FC = () => {
  const cancelRef = React.useRef<FocusableElement | null>(null);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => {}}
      isOpen={true}
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

export default SignatureOverlayAlert;
