import React, { useCallback, useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "@emotion/styled";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Avatar,
  AvatarBadge,
  Checkbox,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";

// components
import AuthTemplate from "@components/template/AuthTemplate";

// no components
import { signUpSchema } from "@libs/yup/schema";
import FileUpload from "@components/common/FileUpload";

interface FormFieldValues {
  profileUrl?: string;
  nickname: string;
  email: string;
  walletAddress: string;
  gender: "M" | "F";
}

interface SignupProps {}
const SignupPage: React.FC<SignupProps> = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [file, setFile] = useState<any>(null);
  const [preview, setPreview] = useState<string>("");

  const { handleSubmit, register, reset, control, watch, setValue } = useForm<
    FormFieldValues
  >({
    mode: "onSubmit",
    resolver: yupResolver(signUpSchema),
    criteriaMode: "firstError",
    reValidateMode: "onChange",
    defaultValues: {
      profileUrl: "",
      nickname: "",
      email: "",
      walletAddress: "",
      gender: "M",
    },
  });

  console.log(watch());

  // 회원가입
  const onSubmit: SubmitHandler<FormFieldValues> = (input) => {};

  // set init form validation
  useEffect(() => {
    reset({
      walletAddress: klaytn.selectedAddress,
    });
  }, [reset]);

  // set preview image
  useEffect(() => {
    if (!file) return;
    const url = window.URL.createObjectURL(file);
    setPreview(url);
    return () => {
      window.URL.revokeObjectURL(url);
    };
  }, [file]);

  // 프리뷰 삭제
  const onRemovePreview = useCallback(() => {
    setPreview("");
    setFile(null);
  }, []);

  return (
    <>
      <AuthTemplate>
        <h3
          className="mb-10 text-3xl font-bold text-center tracking-tight text-gray-700"
        >
          회원가입
        </h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center space-y-3"
        >
          {preview
            ? (
              <Avatar
                size="2xl"
                src={preview}
              >
                <AvatarBadge
                  boxSize="0.9em"
                  bg="gray.100"
                  cursor="pointer"
                  onClick={onRemovePreview}
                >
                  <Icon as={AiOutlineDelete} w="5" h="5" />
                </AvatarBadge>
              </Avatar>
            )
            : (
              <WrapperBlock>
                <FileUpload
                  onSetUploadFile={(file) => {
                    console.log(file?.file);
                    setFile(file?.file);
                  }}
                  labelIdle={`
              <div style="margin-top:3.2rem;">
                <svg
                  width="120"
                  height="120"
                  view-box="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="60" cy="60" r="60" fill="#141E28" fill-opacity="0.8"></circle>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M57 50C56.6656 50 56.3534 50.1671 56.1679 50.4453L54.4648 53H51C50.2044 53 49.4413 53.3161 48.8787 53.8787C48.3161 54.4413 48 55.2044 48 56V67C48 67.7957 48.3161 68.5587 48.8787 69.1213C49.4413 69.6839 50.2043 70 51 70H69C69.7957 70 70.5587 69.6839 71.1213 69.1213C71.6839 68.5587 72 67.7957 72 67V56C72 55.2043 71.6839 54.4413 71.1213 53.8787C70.5587 53.3161 69.7957 53 69 53H65.5352L63.8321 50.4453C63.6466 50.1671 63.3344 50 63 50H57ZM55.8321 54.5547L57.5352 52H62.4648L64.1679 54.5547C64.3534 54.8329 64.6656 55 65 55H69C69.2652 55 69.5196 55.1054 69.7071 55.2929C69.8946 55.4804 70 55.7348 70 56V67C70 67.2652 69.8946 67.5196 69.7071 67.7071C69.5196 67.8946 69.2652 68 69 68H51C50.7348 68 50.4804 67.8946 50.2929 67.7071C50.1054 67.5196 50 67.2652 50 67V56C50 55.7348 50.1054 55.4804 50.2929 55.2929C50.4804 55.1054 50.7348 55 51 55H55C55.3344 55 55.6466 54.8329 55.8321 54.5547ZM57 61C57 59.3431 58.3431 58 60 58C61.6569 58 63 59.3431 63 61C63 62.6569 61.6569 64 60 64C58.3431 64 57 62.6569 57 61ZM60 56C57.2386 56 55 58.2386 55 61C55 63.7614 57.2386 66 60 66C62.7614 66 65 63.7614 65 61C65 58.2386 62.7614 56 60 56Z"
                    fill="white"
                  >
                  </path>
                </svg>
              </div>
              `}
                />
              </WrapperBlock>
            )}
          <FormControl id="nickname" isRequired>
            <FormLabel>닉네임</FormLabel>
            <Input type="text" placeholder="닉네임" {...register("nickname")} />
          </FormControl>
          <FormControl id="address" isRequired>
            <FormLabel>지갑 주소</FormLabel>
            <Input
              type="text"
              placeholder="지갑 주소"
              disabled
              {...register("walletAddress")}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>이메일 주소</FormLabel>
            <Input type="text" placeholder="이메일 주소" {...register("email")} />
          </FormControl>
          <FormControl id="gender">
            <FormLabel>성별</FormLabel>
            <Controller
              name="gender"
              control={control}
              defaultValue="M"
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Stack direction="row">
                    <Radio value="M">남성</Radio>
                    <Radio value="F">여성</Radio>
                  </Stack>
                </RadioGroup>
              )}
            />
          </FormControl>
        </form>
        <p className="text-sm text-gray-500 mt-12 text-center">
          <Stack spacing={5} direction="column">
            <Checkbox>
              <Text fontSize="md">만 19세 이상입니다.</Text>
            </Checkbox>
            <Checkbox>
              <Text fontSize="md">(필수) 서비스 이용약관에 동의합니다.</Text>
            </Checkbox>
            <Checkbox>
              <Text fontSize="md">(필수) 개인정보 수집 및 이용에 동의합니다.</Text>
            </Checkbox>
          </Stack>
        </p>
      </AuthTemplate>
    </>
  );
};

export default SignupPage;

const WrapperBlock = styled.div`
  .filepond--root {
    width: 128px;
    height: 128px;
  }

  /* use a hand cursor intead of arrow for the action buttons */
  .filepond--file-action-button {
      cursor: pointer;
  }

  /* the text color of the drop label*/
  .filepond--drop-label {
      color: #555;
  }

  /* underline color for "Browse" button */
  .filepond--label-action {
      text-decoration-color: #aaa;
  }

  /* the background color of the filepond drop area */
  .filepond--panel-root {
      background-color: #eee;
  }

  /* the background color of the black action buttons */
  .filepond--file-action-button {
      background-color: rgba(0, 0, 0, 0.5);
  }

  /* the icon color of the black action buttons */
  .filepond--file-action-button {
      color: white;
  }

  /* the color of the focus ring */
  .filepond--file-action-button:hover,
  .filepond--file-action-button:focus {
      box-shadow: 0 0 0 0.125em rgba(255, 255, 255, 0.9);
  }

  /* the text color of the file status and info labels */
  .filepond--file {
      color: white;
  }

  /* error state color */
  [data-filepond-item-state*='error'] .filepond--item-panel,
  [data-filepond-item-state*='invalid'] .filepond--item-panel {
      background-color: red;
  }

  [data-filepond-item-state='processing-complete'] .filepond--item-panel {
      background-color: green;
  }

  /* bordered drop area */
  .filepond--panel-root {
    background-color: transparent;
    border: 1px dashed #dee2e6;
    border-radius: 50%;
    cursor: pointer;
  }

  a.filepond--credits {
    display: none;
  }

  .filepond--image-preview-wrapper {
    border-radius: 50%;
    background: transparent;
  }

  .filepond--image-preview-overlay-idle {
    color: transparent;
  }

  .filepond--file-info {
    display: none !important;
  }

  .filepond--list-scroller[data-state=overflow] {
    mask: none;
  }

  .filepond--item-panel {
    background: transparent !important;
  }
`;
