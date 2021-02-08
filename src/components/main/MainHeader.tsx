import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import MainResponsive from './MainResponsive';
import media from '~/libs/styles/media';
import LogoIcon from '../svg/LogoIcon';
import Search2Icon from '../svg/Search2Icon';
import RoundButton from '../common/RoundButton';

const ManHeaderBlock = styled.div`
  height: 4rem;
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
`;

const SearchButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  outline: none;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.045);
  }
  svg {
    width: 1.125rem;
    height: 1.125rem;
  }
  margin-right: 0.75rem;
`;

const Inner = styled(MainResponsive)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  .write-button {
    ${media.medium} {
      display: none;
    }
  }
`;

interface MainHeaderProps {}
function MainHeader(_: MainHeaderProps) {
  return (
    <ManHeaderBlock>
      <Inner>
        <Link href="/">
          <StyledLink>
            <LogoIcon />
          </StyledLink>
        </Link>
        <Right>
          <Link href="/search">
            <SearchButton>
              <Search2Icon />
            </SearchButton>
          </Link>
          <RoundButton color="darkGray">로그인</RoundButton>
        </Right>
      </Inner>
    </ManHeaderBlock>
  );
}

export default MainHeader;
