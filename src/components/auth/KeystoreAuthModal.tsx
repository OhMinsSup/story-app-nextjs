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
  Text,
  usePrevious,
} from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import { SubmitHandler, useForm } from "react-hook-form";
import useUpload from "@hooks/useUpload";
import caver from "@klaytn/caver";
import { validKeystore } from "@utils/utils";

interface FormFieldValus {
  keystore?: File;
  password: string;
}

interface KeystoreAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const KeystoreAuthModal: React.FC<KeystoreAuthModalProps> = (
  { isOpen, onClose },
) => {
  const accept = "application/JSON";
  const prevIsOpen = usePrevious(isOpen);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [file, upload, clear] = useUpload(accept);

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFieldValus>({
    mode: "onSubmit",
    criteriaMode: "firstError",
    defaultValues: {
      keystore: undefined,
      password: "",
    },
  });

  // Keystore file upload set change hook form value
  useEffect(() => {
    if (!file) {
      setValue("keystore", undefined, { shouldValidate: true });
      return;
    }
    setValue("keystore", file, { shouldValidate: true });
  }, [file]);

  // keystore file upload
  const onClick = useCallback(() => {
    upload();
  }, []);

  // Keystore file login
  const onLogin = useCallback(() => {
    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true }),
    );
  }, []);

  // read keystore file
  const readKeystoreFile = (keystore?: File) => {
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      if (!keystore) {
        const error = new Error();
        error.name = "KeystoreFileNotFound";
        error.message = "Keystore file is required";
        return reject(error);
      }

      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        if (validKeystore(reader.result)) {
          resolve(reader.result);
        } else {
          const error = new Error();
          error.name = "InvalidKeystore";
          error.message = "Invalid keystore file";
          reject(error);
        }
      };

      reader.readAsText(keystore);
    });
  };

  // onsubmit handler
  const onSubmit: SubmitHandler<FormFieldValus> = async (input) => {
    try {
      const keystore = await readKeystoreFile(input.keystore);
      const accountKey = caver.klay.accounts.decrypt(
        keystore,
        input.password,
      );

      const { privateKey } = accountKey;
      console.log("accountKey", accountKey);
      console.log("privateKey", privateKey);
    } catch (error) {
      console.error(error);
    }
  };

  // close modal reset hook form
  useEffect(() => {
    if (prevIsOpen && !isOpen) {
      clear();
      reset({
        keystore: undefined,
        password: "",
      });
    }

    // open set keystore file validation
    if (isOpen) {
      register("keystore", { required: true });
    }
  }, [isOpen, prevIsOpen]);

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
                <Input
                  readOnly
                  className="cursor-pointer"
                  placeholder="Keystore File"
                  name="keystore"
                  defaultValue={file ? file.name : ""}
                  onClick={onClick}
                />
              </InputGroup>
              {errors && errors.keystore && (
                <Text fontSize="md" color="red.400">
                  keystore 파일을 선택해주세요.
                </Text>
              )}
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>비밀번호</FormLabel>
              <Input
                type="password"
                placeholder="비밀번호"
                id="password"
                {...register("password", { required: true })}
              />
              {errors && errors.password && (
                <Text fontSize="md" color="red.400">
                  비밀번호를 입력해주세요.
                </Text>
              )}
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
