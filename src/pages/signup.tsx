import React, { useCallback } from 'react';

// validation
import { useForm, yupResolver } from '@mantine/form';
import { schema } from '@libs/validation/schema';

// hooks
import { useSignupMutation, useUploadMutation } from '@api/mutations';

// components
import { SignupSeo } from '@components/ui/Seo';
import { Layout } from '@components/ui/Layout';
import { UserProfileUpload } from '@components/ui/Upload';
import {
  Button,
  Container,
  Input,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';

// enum
import { StoryUploadTypeEnum } from '@api/schema/enum';
import { RESULT_CODE } from '@constants/constant';

interface FormFieldValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileUrl?: string | null;
}

const SignupPage = () => {
  const {
    mutateAsync: signupFn,
    isLoading: sIsLoading,
    state,
  } = useSignupMutation();

  const { mutateAsync: uploadFn, isLoading: uIsLoading } = useUploadMutation({
    onSuccess(data) {
      form.setFieldValue('profileUrl', data.path);
    },
  });

  const form = useForm<FormFieldValues>({
    validate: yupResolver(schema.signup),
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      profileUrl: undefined,
    },
  });

  const onSubmit = (input: FormFieldValues) => signupFn(input);

  const onRemove = useCallback(() => {
    const currentUrl = form.values.profileUrl;
    // 업로드한 이미지가 존재하는 경우
    if (currentUrl) {
      form.setFieldValue('profileUrl', undefined);
    }
  }, [form]);

  const onUpload = useCallback(
    (file: File) =>
      uploadFn({
        file,
        storyType: StoryUploadTypeEnum.PROFILE,
      }),
    [uploadFn],
  );

  return (
    <Layout>
      <SignupSeo />
      <Container size={420} my={40} className="space-y-3">
        <div>
          <Text size="lg" weight={700}>
            Story
          </Text>
          <Text weight={400}>에 오신걸 환영합니다.</Text>
        </div>

        <form onSubmit={form.onSubmit(onSubmit)}>
          <UserProfileUpload
            loading={uIsLoading}
            thumbnail={form.values.profileUrl}
            onUpload={onUpload}
            onRemove={onRemove}
          />
          <div className="flex flex-col space-y-3">
            <TextInput
              label={
                <Text size="md" weight={500}>
                  닉네임
                </Text>
              }
              id="username"
              autoComplete="nickname"
              placeholder="닉네임"
              {...form.getInputProps('username')}
            />
            <TextInput
              label={
                <Text size="md" weight={500}>
                  이메일
                </Text>
              }
              id="email"
              autoComplete="email"
              placeholder="이메일"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label={
                <Text size="md" weight={500}>
                  비밀번호
                </Text>
              }
              {...form.getInputProps('password')}
              id="password"
              autoComplete="current-password "
              placeholder="비밀번호"
            />
            <PasswordInput
              label={
                <Text size="md" weight={500}>
                  비밀번호 확인
                </Text>
              }
              {...form.getInputProps('confirmPassword')}
              id="confirmPassword"
              autoComplete="current-password "
              placeholder="비밀번호 확인"
            />
          </div>

          {state?.code === RESULT_CODE.ALREADY_EXIST && (
            <Input.Error className="mt-3 mb-3">{state?.message}</Input.Error>
          )}

          <Button type="submit" fullWidth mt="xl" loading={sIsLoading}>
            회원가입
          </Button>
        </form>
      </Container>
    </Layout>
  );
};

export default SignupPage;
