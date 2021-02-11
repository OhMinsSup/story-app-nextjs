import React from 'react';
import styled, { css } from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import palette from '~/libs/styles/palette';

const AuthSocialButtonBlock = styled.a<{ border: boolean }>`
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: 0.125s all ease-in;
  color: white;
  ${(props) =>
    props.border &&
    css`
      border: 1px solid ${palette.gray3};
    `}
  &:focus {
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.35);
  }
`;

interface AuthSocialButtonProps {
  provider: 'facebook' | 'google' | 'github';
  tabIndex?: number;
  currentPath: string;
}

const providerMap = {
  github: {
    color: '#272e33',
    icon: AiFillGithub,
    border: false,
  },
  google: {
    color: 'white',
    icon: FcGoogle,
    border: true,
  },
  facebook: {
    color: '#3b5998',
    icon: FaFacebookF,
    border: false,
  },
};

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  provider,
  tabIndex,
  currentPath,
}) => {
  const info = providerMap[provider];
  const { icon: Icon, color, border } = info;

  const host =
    process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080/';

  const redirectTo = `${host}api/v1.0/auth/social/redirect/${provider}?next=${currentPath}`;

  return (
    <AuthSocialButtonBlock
      style={{
        background: color,
      }}
      border={border}
      tabIndex={tabIndex}
      href={redirectTo}
    >
      <Icon />
    </AuthSocialButtonBlock>
  );
};

export default AuthSocialButton;
