import React, { useEffect } from 'react';
import { Lock } from 'tabler-icons-react';
import {
  Modal,
  Button,
  Group,
  PasswordInput,
  LoadingOverlay,
  Paper,
} from '@mantine/core';

// validation
import { useForm, yupResolver } from '@mantine/form';
import { schema } from '@libs/validation/schema';

// mutation
import { useLoginByKeystoreMutation } from '@api/mutations';

interface FormFieldValues {
  file: File;
  keystorePassword: string;
}

interface LoginKeyStorePopupProps {
  payload: File | null;
  onClose: () => void;
}

const LoginKeystorePopup: React.FC<LoginKeyStorePopupProps> = ({
  payload,
  onClose,
}) => {
  const form = useForm<FormFieldValues>({
    validate: yupResolver(schema.loginByKeystore),
  });

  const { mutate, isLoading } = useLoginByKeystoreMutation();

  const onSubmit = (input: FormFieldValues) =>
    mutate({
      file: input.file,
      password: input.keystorePassword,
    });

  useEffect(() => {
    if (payload) form.setFieldValue('file', payload);
    return () => {
      form.clearErrors();
      form.reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload]);

  return (
    <Modal
      opened={!!payload}
      onClose={onClose}
      title="키스토어 로그인"
      centered
    >
      <Paper
        p={0}
        style={{
          position: 'relative',
        }}
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <LoadingOverlay visible={isLoading} />
          <PasswordInput
            mt="md"
            required
            id="keystorePassword"
            placeholder="키스토어 비밀번호를 입력해주세요."
            label="비밀번호"
            icon={<Lock size={16} />}
            autoComplete="current-password"
            {...form.getInputProps('keystorePassword')}
          />
          <Group position="apart" mt="xl">
            <Button type="submit" fullWidth>
              로그인
            </Button>
          </Group>
        </form>
      </Paper>
    </Modal>
  );
};

export default LoginKeystorePopup;
