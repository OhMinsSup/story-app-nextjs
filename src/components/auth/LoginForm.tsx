import React, { useCallback } from 'react';

// compoents
import {
  Anchor,
  Button,
  Group,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';

// validation
import { useForm, yupResolver } from '@mantine/form';
import { schema } from '@libs/validation/schema';

// hooks
import { useRouter } from 'next/router';

// constants
import { PAGE_ENDPOINTS } from '@constants/constant';

interface LogintFormProps {
  isLoading: boolean;
  submit:
    | ((input: FormFieldValues) => void)
    | ((input: FormFieldValues) => Promise<any>);
}

const LoginForm: React.FC<LogintFormProps> = ({ isLoading, submit }) => {
  const router = useRouter();

  const form = useForm<FormFieldValues>({
    validate: yupResolver(schema.login),
    initialValues: {
      email: 'veloss@email.io',
      password: '1q2w3e4r!@',
    },
  });

  const onMoveToSignUp = useCallback(() => {
    router.push(PAGE_ENDPOINTS.SIGNUP);
  }, [router]);

  const onSubmit = (input: FormFieldValues) => submit(input);

  return (
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
  );
};

export default LoginForm;

interface FormFieldValues {
  email: string;
  password: string;
}
