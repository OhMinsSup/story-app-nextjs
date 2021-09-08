import React, { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";

// components
import AuthTemplate from "@components/template/AuthTemplate";
import ProfileUploadIcon from "@components/Icon/ProfileUploadIcon";

// no components
import { signUpSchema } from "@libs/yup/schema";
import { generateAvatar } from "@utils/utils";

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
  const { handleSubmit, register, reset, control, watch } = useForm<
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
          <div className="profile-image-content text-center">
            <div className="profile-overlay text-center">
              <div>
                <ProfileUploadIcon />
              </div>
            </div>
          </div>
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
