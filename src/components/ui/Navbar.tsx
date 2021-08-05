import React from 'react';
import Link from 'next/link';

import { PAGE_ENDPOINTS } from '@contants/contant';

import LogoIcon from '@components/Icon/LogoIcon';
import SearchIcon from '@components/Icon/SearchIcon';

interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="site-nav">
      <div className="site-nav-container">
        <nav className="site-nav-desktop-only align-center">
          <div aria-label="Logo">
            <Link href={PAGE_ENDPOINTS.INDEX}>
              <a>
                <LogoIcon />
              </a>
            </Link>
          </div>
          <ul className="site-nav-desktop-nav">
            <li className="site-nav-desktop-item site-nav-hover-item">
              <Link href={PAGE_ENDPOINTS.ILLUSTRATION}>
                <a className="font-bold">일러스트</a>
              </Link>
            </li>
          </ul>
        </nav>
        <ul className="site-nav-actions">
          <li className="site-nav-actions-item site-nav-desktop-only">
            <form className="site-nav-inline-search">
              <SearchIcon />
              <input
                className="site-nav-inline-search-input"
                type="search"
                name="q"
                placeholder="Search"
                autoComplete="off"
              />
            </form>
          </li>
          <li className="site-nav-actions-item site-nav-desktop-only justify-center">
            <Link href={PAGE_ENDPOINTS.INDEX}>
              <a>
                <img
                  className="site-nav-avatar lazyloaded"
                  alt="OhMinSeop"
                  width="32"
                  height="32"
                  data-src="https://cdn.dribbble.com/users/4714321/avatars/normal/open-uri20200123-26444-dmet7r?1579773018"
                  src="https://cdn.dribbble.com/users/4714321/avatars/normal/open-uri20200123-26444-dmet7r?1579773018"
                />
              </a>
            </Link>
            {/* Hover User Menu */}
            <div className="site-nav-action-menu site-nav-user-menu"></div>
          </li>
          <li className="site-nav-actions-item site-nav-desktop-only justify-center">
            <Link href={PAGE_ENDPOINTS.INDEX}>
              <a className="form-sub site-nav-actions-icon-link">발행하기</a>
            </Link>
          </li>
          <li className="site-nav-actions-item site-nav-desktop-only justify-center">
            <button type="button" className="form-btn">
              인증하기
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
