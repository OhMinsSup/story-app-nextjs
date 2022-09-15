import React, { useCallback, useRef } from 'react';

// validation
import { useForm, yupResolver } from '@mantine/form';
import { schema } from '@libs/validation/schema';

// hooks
import {
  useSignupByKeystoreMutation,
  useSignupMutation,
  useUploadMutation,
} from '@api/mutations';

// components
import { UserProfileUpload } from '@components/ui/Upload';
import {
  Button,
  Divider,
  FileButton,
  Group,
  Input,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { KlaytnIcon } from '@components/ui/Icon';

// constants
import { RESULT_CODE } from '@constants/constant';
import { MEDIA_TYPE, UPLOAD_TYPE } from '@api/schema/story-api';

interface FormFieldValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileUrl?: string | null;
  file?: File | null;
}

const SignupForm = () => {
  const resetRef = useRef<() => void>(null);

  const {
    mutateAsync: signupFn,
    isLoading: sIsLoading,
    state: sState,
  } = useSignupMutation();

  const {
    mutateAsync: signupByKeystoreFn,
    isLoading: sBKIsLoading,
    state: sBKState,
  } = useSignupByKeystoreMutation();

  const { mutateAsync: uploadFn, isLoading: uIsLoading } = useUploadMutation({
    onSuccess(data) {
      form.setFieldValue('profileUrl', data.secureUrl);
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
      file: undefined,
    },
  });

  const onSubmit = (input: FormFieldValues) => {
    if (input.file instanceof File && input.file) {
      // overwrite file type
      return signupByKeystoreFn(input as FormFieldValues & { file: File });
    }
    return signupFn(input);
  };

  const onRemove = useCallback(() => {
    const currentUrl = form.values.profileUrl;
    // 업로드한 이미지가 존재하는 경우
    if (currentUrl) {
      form.setFieldValue('profileUrl', undefined);
    }
  }, [form]);

  const onUpload = useCallback(
    (file: File) => {
      const body = {
        file,
        mediaType: MEDIA_TYPE.THUMBNAIL,
        uploadType: UPLOAD_TYPE.THUMBNAIL,
      } as const;
      return uploadFn(body);
    },
    [uploadFn],
  );

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <UserProfileUpload
        loading={uIsLoading}
        thumbnail={form.values.profileUrl}
        onUpload={onUpload}
        onRemove={onRemove}
      />
      <Divider label="인증" labelPosition="left" my="lg" />
      <div>
        <Text size="md" weight={500}>
          Keystore 인증
        </Text>
        <Group grow mb="md" mt="md">
          <FileButton
            resetRef={resetRef}
            onChange={(payload) => {
              form.setFieldValue('file', payload);
            }}
            accept=".json,application/json"
          >
            {(props) => (
              <Button
                leftIcon={<KlaytnIcon className="w-5 h-5 fill-current" />}
                variant="default"
                color="gray"
                {...props}
              >
                Keystore
              </Button>
            )}
          </FileButton>
        </Group>
      </div>
      <Divider label="정보" labelPosition="left" my="lg" />
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

      {sState?.code === RESULT_CODE.ALREADY_EXIST && (
        <Input.Error className="mt-3 mb-3">{sState?.message}</Input.Error>
      )}
      {sBKState?.code === RESULT_CODE.ALREADY_EXIST && (
        <Input.Error className="mt-3 mb-3">{sBKState?.message}</Input.Error>
      )}
      <Button
        type="submit"
        fullWidth
        mt="xl"
        loading={sIsLoading || sBKIsLoading}
      >
        회원가입
      </Button>
    </form>
  );
};

export default SignupForm;
