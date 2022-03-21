import React, { useMemo } from 'react';

// constatns
import { PAGE_ENDPOINTS } from '@constants/constant';

// validation
import { useForm, yupResolver } from '@mantine/form';
import { schema } from '@libs/validation/schema';

// utils
import { generateKey } from '@utils/utils';

// components
import { SEO } from '@components/common/SEO';
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
import { Header } from '@components/ui/Header';

// enum
import { GenderEnum } from '@api/schema/enum';

// types
import type { GenderType } from '@api/schema/story-api';
import { UserProfileUpload } from '@components/ui/Upload';

interface FormFieldValues {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
  key: string;
  gender: GenderType;
}

const SignupPage = () => {
  const initialValues = useMemo(() => {
    return {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
      key: generateKey(),
      gender: GenderEnum.M as const,
    };
  }, []);

  const form = useForm<FormFieldValues>({
    schema: yupResolver(schema.signup),
    initialValues,
  });

  const onSubmit = async (input: FormFieldValues) => {
    console.log(input);
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
            <UserProfileUpload avatarkey={form.values.key} />
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
