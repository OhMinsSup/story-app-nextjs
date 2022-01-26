import React from 'react';
import { useRouter } from 'next/router';
import ErrorScreenTemplate from './ErrorScreenTemplate';

interface ErrorBoundaryProps {
  handleClearError: () => void;
}
const NetworkErrorScreen: React.FC<ErrorBoundaryProps> = ({
  handleClearError,
}) => {
  const router = useRouter();

  return (
    <ErrorScreenTemplate
      image="/images/undraw_server_down.svg"
      message={'서버와의 연결이 불안정합니다.\n잠시 후 시도해주세요.'}
      buttonText="새로고침"
      onButtonClick={() => {
        handleClearError();
        router.reload();
      }}
    />
  );
};

export default NetworkErrorScreen;
