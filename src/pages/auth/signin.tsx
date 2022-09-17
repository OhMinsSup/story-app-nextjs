import React, { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// compoents
import { LoginSeo } from '@components/ui/SEO';
import { Layout } from '@components/ui/Layout';
import { KlaytnIcon } from '@components/ui/Icon';
import { LoginForm } from '@components/auth';
import {
  Button,
  Container,
  Divider,
  Group,
  Text,
  FileButton,
} from '@mantine/core';

// hooks
import { useLoginMutation } from '@api/mutations';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';

// atoms
import { authAtom } from '@atoms/authAtom';

// constants
import { PAGE_ENDPOINTS } from '@constants/constant';

// dynamic
const LoginKeystorePopup = dynamic(
  () => import('@components/auth/LoginKeystorePopup'),
);

function SigninPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);
  const isAuthication = useAtomValue(authAtom);

  const { mutate, isLoading } = useLoginMutation();

  const onCloseModal = useCallback(() => {
    setFile(null);
    resetRef.current?.();
  }, []);

  useEffect(() => {
    if (isAuthication) {
      router.replace(router.query.redirect?.toString() || PAGE_ENDPOINTS.INDEX);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthication]);

  return (
    <Container size={420} my={40}>
      <Text size="lg" weight={700}>
        Story
      </Text>
      <Text weight={400}>에 로그인하세요.</Text>
      <Group grow mb="md" mt="md">
        <FileButton
          resetRef={resetRef}
          onChange={setFile}
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
      <Divider label="Or" labelPosition="center" my="lg" />
      <LoginForm isLoading={isLoading} submit={mutate} />
      <LoginKeystorePopup payload={file} onClose={onCloseModal} />
    </Container>
  );
}

export default SigninPage;

SigninPage.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <>
      <LoginSeo />
      <Layout>{page}</Layout>
    </>
  );
};
