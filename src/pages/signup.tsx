import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import AuthTemplate from "@components/template/AuthTemplate";
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
import ProfileUploadIcon from "@components/Icon/ProfileUploadIcon";

interface SignupProps {}
const SignupPage: React.FC<SignupProps> = () => {
  const router = useRouter();

  const [value, setValue] = React.useState("1");

  return (
    <>
      <AuthTemplate>
        <h3
          className="mb-10 text-3xl font-bold text-center tracking-tight text-gray-700"
        >
          회원가입
        </h3>
        <form
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
            <Input type="text" placeholder="닉네임" />
          </FormControl>
          <FormControl id="address" isRequired>
            <FormLabel>지갑 주소</FormLabel>
            <Input
              type="text"
              placeholder="지갑 주소"
              defaultValue="12312312312312"
              disabled
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>이메일 주소</FormLabel>
            <Input type="text" placeholder="이메일 주소" />
          </FormControl>
          <FormControl id="gender">
            <FormLabel>성별</FormLabel>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="row">
                <Radio value="1">남성</Radio>
                <Radio value="2">여성</Radio>
              </Stack>
            </RadioGroup>
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
