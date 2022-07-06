import React from 'react';

// compoents
import { GoogleButton, GithubButton } from '@components/ui/Button';
import { Seo } from '@components/ui/Seo';
import { Layout } from '@components/ui/Layout';
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

// validation
import { useForm, yupResolver } from '@mantine/form';
import { schema } from '@libs/validation/schema';

// hooks
import { useLoginMutation } from '@api/mutations';
import { useRouter } from 'next/router';
import { useAlert } from '@hooks/useAlert';
import { useAtomValue } from 'jotai';

// atom
import { authAtom } from '@atoms/authAtom';

// constants
import { PAGE_ENDPOINTS } from '@constants/constant';

// types
import type { LoginInput } from '@api/schema/story-api';

const LoginPage = () => {
  const router = useRouter();
  const session = useAtomValue(authAtom);

  const form = useForm<LoginInput>({
    schema: yupResolver(schema.login),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const { trigger, isLoading } = useLoginMutation();
  const { Alert, showAlert } = useAlert();

  const onSubmit = async (input: LoginInput) => {
    await trigger(input);
  };

  const onMoveToSignUp = () => {
    router.push(PAGE_ENDPOINTS.SIGNUP);
  };

  if (session) {
    router.replace(PAGE_ENDPOINTS.INDEX);
  }

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
