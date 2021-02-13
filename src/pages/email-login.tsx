import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import palette from '~/libs/styles/palette';
import { useCodeLoginHook } from '~/api/auth/auth.hook';

interface EmailLoginPageProps {}
function EmailLoginPage(_: EmailLoginPageProps) {
  const [_codeLogin, , data] = useCodeLoginHook();
  const { query, replace } = useRouter();

  const processError = () => {
    toast.error('💩 잘못된 접근입니다.', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    replace('/');
  };

  const processLogin = useCallback(async () => {
    try {
      await _codeLogin(query.code);
      replace('/');
    } catch (e) {
      console.error(e);
      processError();
    }
  }, [query.code]);

  useEffect(() => {
    if (data && data.code === 200) {
      // TODO: get user data N token data save
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    if (!query.code) {
      processError();
      return;
    }

    processLogin();
  }, [query.code, processLogin]);

  return (
    <Fullscreen>
      <SpinnerBlock>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </SpinnerBlock>
    </Fullscreen>
  );
}

export default EmailLoginPage;

const Fullscreen = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerBlock = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
  .sk-chase-dot {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: sk-chase-dot 2s infinite ease-in-out both;
  }
  .sk-chase-dot:before {
    content: '';
    display: block;
    width: 25%;
    height: 25%;
    background-color: ${palette.teal6};
    border-radius: 100%;
    animation: sk-chase-dot-before 2s infinite ease-in-out both;
  }
  .sk-chase-dot:nth-child(1) {
    animation-delay: -1.1s;
  }
  .sk-chase-dot:nth-child(2) {
    animation-delay: -1s;
  }
  .sk-chase-dot:nth-child(3) {
    animation-delay: -0.9s;
  }
  .sk-chase-dot:nth-child(4) {
    animation-delay: -0.8s;
  }
  .sk-chase-dot:nth-child(5) {
    animation-delay: -0.7s;
  }
  .sk-chase-dot:nth-child(6) {
    animation-delay: -0.6s;
  }
  .sk-chase-dot:nth-child(1):before {
    animation-delay: -1.1s;
  }
  .sk-chase-dot:nth-child(2):before {
    animation-delay: -1s;
  }
  .sk-chase-dot:nth-child(3):before {
    animation-delay: -0.9s;
  }
  .sk-chase-dot:nth-child(4):before {
    animation-delay: -0.8s;
  }
  .sk-chase-dot:nth-child(5):before {
    animation-delay: -0.7s;
  }
  .sk-chase-dot:nth-child(6):before {
    animation-delay: -0.6s;
  }
  @keyframes sk-chase {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes sk-chase-dot {
    80%,
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes sk-chase-dot-before {
    50% {
      transform: scale(0.4);
    }
    100%,
    0% {
      transform: scale(1);
    }
  }
`;
