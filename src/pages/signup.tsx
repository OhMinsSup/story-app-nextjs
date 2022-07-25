import React, { useCallback, useMemo } from 'react';

// validation
import { useForm, yupResolver } from '@mantine/form';
import { schema } from '@libs/validation/schema';

// hooks
import { useSignupMutation, useUploadMutation } from '@api/mutations';

// utils
import { generateKey } from '@utils/utils';

// components
import { SignupSeo } from '@components/ui/Seo';
import { Layout } from '@components/ui/Layout';
import { UserProfileUpload } from '@components/ui/Upload';
import {
  Button,
  Container,
  Group,
  PasswordInput,
  Radio,
  Text,
  TextInput,
} from '@mantine/core';

// enum
import { GenderEnum, StoryUploadTypeEnum } from '@api/schema/enum';

// types
import type { GenderType } from '@api/schema/story-api';

interface FormFieldValues {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatarSvg: string;
  profileUrl?: string;
  defaultProfile: boolean;
  gender: GenderType;
}

const SignupPage = () => {
  const initialValues = useMemo(() => {
    return {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatarSvg: generateKey(),
      profileUrl: undefined,
      defaultProfile: true,
      gender: GenderEnum.M as const,
    };
  }, []);

  const { mutateAsync: signupFn, isLoading: sIsLoading } = useSignupMutation();
  const { mutateAsync: uploadFn, isLoading: uIsLoading } = useUploadMutation({
    onSuccess(data) {
      form.setFieldValue('profileUrl', data.path);
      form.setFieldValue('defaultProfile', false);
    },
  });

  const form = useForm<FormFieldValues>({
    validate: yupResolver(schema.signup),
    initialValues,
  });

  const onSubmit = (input: FormFieldValues) => signupFn(input);

  const onRemove = useCallback(() => {
    const currentUrl = form.values.profileUrl;
    // 업로드한 이미지가 존재하는 경우
    if (currentUrl) {
      form.setFieldValue('profileUrl', undefined);
      form.setFieldValue('defaultProfile', true);
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
            avatarkey={form.values.avatarSvg}
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
              id="nickname"
              autoComplete="on"
              placeholder="닉네임"
              {...form.getInputProps('nickname')}
            />
            <TextInput
              label={
                <Text size="md" weight={500}>
                  이메일
                </Text>
              }
              id="email"
              autoComplete="on"
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
              autoComplete="on"
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
              autoComplete="on"
              placeholder="비밀번호 확인"
            />

            <Radio.Group
              defaultValue={'react'}
              label={
                <Text size="md" weight={500}>
                  성별
                </Text>
              }
              {...form.getInputProps('gender')}
            >
              <Radio value={GenderEnum.M} label="남성" />
              <Radio value={GenderEnum.F} label="여성" />
            </Radio.Group>
          </div>

          <Button type="submit" fullWidth mt="xl" loading={sIsLoading}>
            회원가입
          </Button>
        </form>
      </Container>
    </Layout>
  );
};

export default SignupPage;
