import React, { useEffect } from 'react';

// components
import { SignupSeo } from '@components/ui/Seo';
import { Layout } from '@components/ui/Layout';
import { Container, Text } from '@mantine/core';
import { SignupForm } from '@components/auth';

// hooks
import { useRouter } from 'next/router';
import { useAtomValue } from 'jotai';

// atoms
import { authAtom } from '@atoms/authAtom';

// constants
import { PAGE_ENDPOINTS } from '@constants/constant';

const SignupPage = () => {
  const router = useRouter();

  const isAuthication = useAtomValue(authAtom);

  useEffect(() => {
    if (isAuthication) {
      router.replace(router.query.redirect?.toString() || PAGE_ENDPOINTS.INDEX);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthication]);

  return (
    <Container size={420} my={40} className="space-y-3">
      <div>
        <Text size="lg" weight={700}>
          Story
        </Text>
        <Text weight={400}>에 오신걸 환영합니다.</Text>
      </div>
      <SignupForm />
    </Container>
  );
};

export default SignupPage;

SignupPage.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <>
      <SignupSeo />
      <Layout>{page}</Layout>
    </>
  );
};
