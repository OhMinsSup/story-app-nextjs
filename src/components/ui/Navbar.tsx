import React from 'react';
import { css } from '@emotion/react';
import Link from 'next/link';
import { PAGE_ENDPOINTS } from '@contants/contant';

interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div css={rootStyles}>
      <div css={siteNavContainerStyles}>
        <nav className="desktop-only items-center">
          <div aria-label="Logo">
            <Link href={PAGE_ENDPOINTS.INDEX}>
              <a>로고</a>
            </Link>
          </div>
          <ul className="desktop-nav flex h-full">
            <li className="desktop-item relative">
              <Link href={PAGE_ENDPOINTS.ILLUSTRATION}>
                <a className="font-bold">일러스트</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

const rootStyles = css`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background: var(--accent-0);
  z-index: 9996;
  box-shadow: inset 0px -1px 0px var(--accent-2);
  box-sizing: border-box;
  will-change: transform;
  user-select: none;

  & .desktop-only {
    @media (min-width: 920px) {
      display: inherit;
    }

    .desktop-nav .desktop-item {
      display: flex;
      align-items: center;
      font-family: 'Haas Grot Text R Web', 'Helvetica Neue', Helvetica, Arial,
        sans-serif;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: var(--accent-3);
      padding-left: 12px;
      padding-right: 12px;
    }
  }
`;

const siteNavContainerStyles = css`
  display: flex;
  justify-content: space-between;
  margin-left: 24px;
  margin-right: 24px;
  height: 100%;
`;
