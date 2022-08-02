import React, { useCallback, useMemo } from 'react';

// compoents
import { GoogleButton, GithubButton } from '@components/ui/Button';
import { LoginSeo } from '@components/ui/Seo';
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
import { useAtomValue } from 'jotai';

// atom
import { authAtom } from '@atoms/authAtom';

// constants
import { PAGE_ENDPOINTS } from '@constants/constant';

interface FormFieldValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const isAuthication = useAtomValue(authAtom);

  const initialValues = useMemo(() => {
    return {
      email: 'veloss@email.io',
      password: '1q2w3e4r!@',
    };
  }, []);

  const form = useForm<FormFieldValues>({
    validate: yupResolver(schema.login),
    initialValues,
  });

  const { mutateAsync, isLoading } = useLoginMutation();

  const onSubmit = (input: FormFieldValues) => mutateAsync(input);

  const onMoveToSignUp = useCallback(() => {
    router.push(PAGE_ENDPOINTS.SIGNUP);
  }, [router]);

  if (isAuthication) {
    router.replace(PAGE_ENDPOINTS.INDEX);
  }

  return (
    <Layout>
      <LoginSeo />
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
          <div className="flex flex-col space-y-3">
            <TextInput
              label={
                <Text size="md" weight={500}>
                  이메일
                </Text>
              }
              id="email"
              className="w-full max-w-full"
              autoComplete="email"
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
              className="w-full max-w-full"
              {...form.getInputProps('password')}
              id="password"
              autoComplete="password"
              placeholder="비밀번호"
            />
          </div>

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
  );
};

export default LoginPage;
