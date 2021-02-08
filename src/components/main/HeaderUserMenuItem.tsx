import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import palette from '~/libs/styles/palette';

const HeaderUserMenuItemBlock = styled.div`
  color: ${palette.gray9};
  padding: 0.75rem 1rem;
  line-height: 1.5;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: ${palette.gray0};
  }
`;

const WrapperLink = styled.a`
  display: block;
  color: inherit;
  text-decoration: none;
`;

interface HeaderUserMenuItemProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
}
function HeaderUserMenuItem({
  children,
  to,
  onClick,
}: HeaderUserMenuItemProps) {
  const jsx = (
    <HeaderUserMenuItemBlock onClick={onClick}>
      {children}
    </HeaderUserMenuItemBlock>
  );
  return to ? (
    <Link href={to}>
      <WrapperLink style={{ display: 'block' }}>{jsx}</WrapperLink>
    </Link>
  ) : (
    jsx
  );
}

export default HeaderUserMenuItem;
