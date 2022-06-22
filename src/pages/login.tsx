import React from 'react';

// compoents
import { GoogleButton, GithubButton } from '@components/ui/Button';
import { Seo } from '@components/ui/Seo';
import {
  Anchor,
  Button,
  Container,
  Divider,
  Group,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';

// utils
import { isObject } from '@utils/assertion';

// validation
import { useForm, yupResolver } from '@mantine/form';
import { schema } from '@libs/validation/schema';

// hooks
import { useLoginMutation } from '@api/mutations';
import { useRouter } from 'next/router';
import { useAlert } from '@hooks/useAlert';

// error
import { ApiError } from '@libs/error';

// constants
import {
  PAGE_ENDPOINTS,
  RESULT_CODE,
  STATUS_CODE,
  STORAGE_KEY,
} from '@constants/constant';

// storage
import { StoryStorage } from '@libs/storage';

// types
import type { LoginInput } from '@api/schema/story-api';
import { Layout } from '@components/ui/Layout';

const LoginPage = () => {
  const router = useRouter();
  const form = useForm<LoginInput>({
    schema: yupResolver(schema.login),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync, isLoading } = useLoginMutation();
  const { Alert, showAlert } = useAlert();

  const onSubmit = async (input: LoginInput) => {
    try {
      const deviceInfo = await StoryStorage.getItem(STORAGE_KEY.PUSH_TOKEN_KEY);
      const body = {
        ...input,
      };

      if (deviceInfo && isObject(deviceInfo)) {
        const { deviceId } = deviceInfo;
        Object.assign(body, { deviceId });
      }

      const result = await mutateAsync(body);

      const {
        data: { resultCode },
      } = result;

      if (RESULT_CODE.OK === resultCode) {
        router.replace(PAGE_ENDPOINTS.INDEX);
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
          case RESULT_CODE.INCORRECT_PASSWORD: {
            msg = '비밀번호가 일치하지 않습니다.';
            break;
          }
          case RESULT_CODE.NOT_EXIST: {
            msg = '존재하지 않는 사용자입니다.';
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

  const onMoveToSignUp = () => {
    router.push(PAGE_ENDPOINTS.SIGNUP);
  };

  return (
    <>
      <Seo title="Story - 로그인" />
      <Layout>
        <Container size={420} my={40}>
          <Text size="lg" weight={700}>
            Story
          </Text>
          <Text weight={400}>에 로그인하세요.</Text>

          <Group grow mb="md" mt="md">
            <GoogleButton radius="xl">Google</GoogleButton>
            <GithubButton radius="xl">Github</GithubButton>
          </Group>
          <Divider label="Or" labelPosition="center" my="lg" />
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Group direction="column" grow>
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
                classNames={{
                  label: 'w-full',
                }}
                label={
                  <div className="flex justify-between items-center">
                    <Text size="md" weight={500}>
                      비밀번호
                    </Text>
                    <Anchor<'a'>
                      onClick={(event) => event.preventDefault()}
                      href="#"
                      size="sm"
                    >
                      비밀번호 찾기
                    </Anchor>
                  </div>
                }
                {...form.getInputProps('password')}
                id="password"
                autoComplete="on"
                placeholder="비밀번호"
              />
            </Group>

            <Button type="submit" fullWidth mt="xl" loading={isLoading}>
              로그인
            </Button>
            <Group position="center" mt="xl" spacing={5}>
              <Text size="sm">아직 회원이 아니신가요?</Text>
              <Anchor
                component="button"
                type="button"
                color="primary"
                size="md"
                onClick={onMoveToSignUp}
              >
                회원가입
              </Anchor>
            </Group>
          </form>
        </Container>
      </Layout>
      <Alert />
    </>
  );
};

export default LoginPage;
