import React, { useCallback } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface InstalledKaikasModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const InstalledKaikasModal: React.FC<InstalledKaikasModalProps> = (
  { isOpen, onClose },
) => {
  const onClick = useCallback(() => {
    const url =
      "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi";
    const win = window.open(url, "_blank");
    if (!win) return;
    win.focus();
  }, []);

  return (
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
          <Button type="button" colorScheme="gray" mr={3} onClick={onClose}>
            취소
          </Button>
          <Button
            type="button"
            colorScheme="purple"
            variant="solid"
            onClick={onClick}
          >
            Kaikas 설치
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InstalledKaikasModal;
