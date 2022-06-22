import React from 'react';
import ErrorScreenTemplate from './ErrorScreenTemplate';
import { PAGE_ENDPOINTS } from '@constants/constant';

interface ErrorBoundaryProps {
  handleClearError: () => void;
}
const CrashErrorScreen: React.FC<ErrorBoundaryProps> = () => {
  return (
    <ErrorScreenTemplate
      image="/images/undraw_warning.svg"
      message="엇! 오류가 발생했습니다."
      buttonText="홈으로"
      onButtonClick={() => {
        window.location.href = PAGE_ENDPOINTS.INDEX;
      }}
    />
  );
};

export default CrashErrorScreen;
