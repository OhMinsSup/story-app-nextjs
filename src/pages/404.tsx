import React from 'react';
import ErrorScreenTemplate from '../components/error/ErrorScreenTemplate';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet-async';

function NotFoundError() {
  const router = useRouter();

  return (
    <>
      <Helmet>
        <title>404 - velog</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <ErrorScreenTemplate
        image="images/undraw_page_not_found_su7k.svg"
        message="아무것도 없네요!"
        buttonText="홈으로"
        onButtonClick={() => {
          router.push('/');
        }}
      />
    </>
  );
}

export default NotFoundError;
