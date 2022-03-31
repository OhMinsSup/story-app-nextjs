import React, { useMemo, useState } from 'react';

// constatns
import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from '@constants/constant';

// validation
import { useForm, yupResolver } from '@mantine/form';
import { schema } from '@libs/validation/schema';

// hooks
import { useAlert } from '@hooks/useAlert';
import { useSignupMutation } from '@api/mutations';
import { useRouter } from 'next/router';

// utils
import { generateKey } from '@utils/utils';

// components
import { SEO } from '@components/common/SEO';
import { UserProfileUpload } from '@components/ui/Upload';
import { Header } from '@components/ui/Header';
import {
  AppShell,
  Button,
  Container,
  Group,
  PasswordInput,
  Radio,
  RadioGroup,
  Text,
  TextInput,
} from '@mantine/core';

// error
import { ApiError } from '@libs/error';

// api
import { api } from '@api/module';

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
  const router = useRouter();
  const { Alert, showAlert } = useAlert();

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

  const [uploading, setUploading] = useState(false);

  const { mutateAsync } = useSignupMutation();

  const form = useForm<FormFieldValues>({
    schema: yupResolver(schema.signup),
    initialValues,
  });

  const onSubmit = async (input: FormFieldValues) => {
    try {
      const result = await mutateAsync(input);

      const {
        data: { resultCode },
      } = result;

      if (RESULT_CODE.OK === resultCode) {
        router.replace(PAGE_ENDPOINTS.LOGIN);
        return;
      }

      throw new ApiError(result.data);
    } catch (error) {
      if (ApiError.isAxiosError(error)) {
        const { response } = error;
        switch (response?.status) {
          case STATUS_CODE.SERVER_ERROR:
          case STATUS_CODE.BAD_GATEWAY:
            throw error;
          default:
            break;
        }
      }

      if (ApiError.isApiError(error)) {
        const { message } = ApiError.toApiErrorJSON(error.message);
        let msg = '에러가 발생했습니다.\n다시 시도해주세요.';
        switch (message?.resultCode) {
          case RESULT_CODE.INVALID: {
            msg = message.message ?? msg;
            break;
          }
        }
        showAlert({
          content: {
            text: msg,
          },
        });
      }
    }
  };

  const onRemove = () => {
    const currentUrl = form.values.profileUrl;
    // 업로드한 이미지가 존재하는 경우
    if (currentUrl) {
      form.setFieldValue('profileUrl', undefined);
      form.setFieldValue('defaultProfile', true);
    }
  };

  const onUpload = async (file: File) => {
    try {
      setUploading(true);
      const result = await api.upload({
        file,
        storyType: StoryUploadTypeEnum.PROFILE,
      });

      const {
        data: { resultCode },
      } = result;

      if (RESULT_CODE.OK === resultCode) {
        form.setFieldValue('profileUrl', result.data.result.path);
        form.setFieldValue('defaultProfile', false);
        setUploading(false);
        return;
      }

      throw new ApiError(result.data);
    } catch (error) {
      setUploading(false);
      if (ApiError.isAxiosError(error)) {
        const text = '에러가 발생했습니다.\n다시 시도해주세요.';
        const { response } = error;
        showAlert({
          content: {
            text,
          },
        });

        switch (response?.status) {
          case STATUS_CODE.SERVER_ERROR:
          case STATUS_CODE.BAD_GATEWAY:
            throw error;
          default:
            break;
        }
      }
    }
  };

  return (
    <>
      <SEO title="Story - 회원가입" url={PAGE_ENDPOINTS.SIGNUP} />
      <AppShell
        padding="md"
        className="h-full"
        navbarOffsetBreakpoint="sm"
        header={<Header />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : undefined,
          },
        })}
      >
        <Container size={420} my={40} className="space-y-3">
          <div>
            <Text size="lg" weight={700}>
              Story
            </Text>
            <Text weight={400}>에 오신걸 환영합니다.</Text>
          </div>

          <form onSubmit={form.onSubmit(onSubmit)}>
            <UserProfileUpload
              loading={uploading}
              thumbnail={form.values.profileUrl}
              avatarkey={form.values.avatarSvg}
              onUpload={onUpload}
              onRemove={onRemove}
            />
            <Group direction="column" grow>
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

              <RadioGroup
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
              </RadioGroup>
            </Group>

            <Button type="submit" fullWidth mt="xl" loading={false}>
              회원가입
            </Button>
          </form>
        </Container>
        <Alert />
        <style jsx>{`
          .mantine-AppShell-body {
            height: 100%;
          }
        `}</style>
      </AppShell>
    </>
  );
};

export default SignupPage;
