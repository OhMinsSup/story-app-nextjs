import React, { useCallback, useEffect, useRef } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import { SubmitHandler, useController, useForm } from "react-hook-form";

interface FormFieldValus {
  keystore: File | undefined;
  password: string;
}

interface KeystoreAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const KeystoreAuthModal: React.FC<KeystoreAuthModalProps> = (
  { isOpen, onClose },
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const { control, reset, register, handleSubmit, formState: { errors } } =
    useForm<FormFieldValus>({
      mode: "onSubmit",
      criteriaMode: "firstError",
      defaultValues: {
        keystore: undefined,
        password: "",
      },
    });

  const {
    field: { ref, value, ...inputProps },
    fieldState: { invalid },
  } = useController({
    name: "keystore",
    control,
    rules: {
      required: true,
    },
  });

  console.log("error", errors);

  const onClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onLogin = useCallback(() => {
    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true }),
    );
  }, []);

  const onSubmit: SubmitHandler<FormFieldValus> = (input) => {
    console.log("login", input);
  };

  useEffect(() => {
    return () => {
      reset();
    };
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
        <ModalHeader>Keystore 로그인</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="space-y-3">
          <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
            <FormControl id="keystore" isRequired>
              <FormLabel>Keystore 파일</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={FiFile} />}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  {...inputProps}
                  className="hidden"
                />
                <Input
                  readOnly
                  placeholder="Keystore File"
                  onClick={onClick}
                  value={value?.name ?? ""}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>비밀번호</FormLabel>
              <Input
                type="password"
                placeholder="비밀번호"
                id="password"
                {...register("password")}
              />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button type="button" colorScheme="gray" mr={3} onClick={onClose}>
            취소
          </Button>
          <Button
            type="button"
            color="gray.100"
            colorScheme="blackAlpha"
            variant="solid"
            onClick={onLogin}
          >
            로그인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default KeystoreAuthModal;
