import React from 'react';
import ErrorScreenTemplate from '../components/error/ErrorScreenTemplate';
import { useRouter } from 'next/router';

function ErrorPage() {
  const router = useRouter();

  return (
    <ErrorScreenTemplate
      image="images/undraw_bug_fixing_oc7a.svg"
      message="엇! 오류가 발생했습니다."
      buttonText="홈으로"
      onButtonClick={() => router.push('/')}
    />
  );
}

export default ErrorPage;
