import React from 'react';
import { useRouter } from 'next/router';
import ErrorScreenTemplate from './ErrorScreenTemplate';

const CrashErrorScreen = () => {
  const router = useRouter();

  return (
    <ErrorScreenTemplate
      image="/images/undraw_warning.svg"
      message="엇! 오류가 발생했습니다."
      buttonText="새로고침"
      onButtonClick={() => router.reload()}
    />
  );
};

export default CrashErrorScreen;
