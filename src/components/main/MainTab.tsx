import React, { useRef } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import cx from 'classnames';
import { useSpring, animated } from 'react-spring';
import { MdTrendingUp, MdAccessTime, MdMoreVert } from 'react-icons/md';

import useToggle from '~/libs/hooks/useToggle';
import { mediaQuery } from '~/libs/styles/media';
import palette from '~/libs/styles/palette';
import MainMobileHeadExtra from './MainMobileHeadExtra';

const Wrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .more {
    cursor: pointer;
    font-size: 1.5rem;
    color: ${palette.gray6};
  }
`;

const MobileMore = styled.div`
  display: none;
  ${mediaQuery(944)} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Block = styled.div`
  display: flex;
  position: relative;
  width: 14rem;
  ${mediaQuery(944)} {
    width: 10rem;
  }
  a {
    width: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    text-decoration: none;
    color: ${palette.gray6};
    height: 3rem;
    svg {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
    &.active {
      color: ${palette.gray8};
      font-weight: bold;
    }
    ${mediaQuery(944)} {
      font-size: 1rem;
      width: 5rem;
      svg {
        font-size: 1.25rem;
      }
    }
  }
`;

const Indicator = styled(animated.div)`
  width: 50%;
  height: 2px;
  position: absolute;
  bottom: 0px;
  background: ${palette.gray8};
`;

interface MainTabProps {
  tab?: string | string[];
}
function MainTab({ tab }: MainTabProps) {
  const [extra, toggle] = useToggle(false);
  const moreButtonRef = useRef<HTMLDivElement | null>(null);

  const onClose = (e: React.MouseEvent<HTMLElement>) => {
    if (!moreButtonRef.current) return;
    if (
      e.target === moreButtonRef.current ||
      moreButtonRef.current.contains(e.target as Node)
    ) {
      return;
    }
    toggle();
  };

  const springStyle = useSpring({
    left: tab && tab === 'recent' ? '50%' : '0%',
    config: {
      friction: 16,
      tensiton: 160,
    } as { friction: number; tensiton: number },
  });

  return (
    <Wrapper>
      <Block>
        <Link href={{ pathname: '/', query: { tab: 'trending' } }}>
          <a className={cx({ active: !tab || (tab && tab === 'trending') })}>
            <MdTrendingUp />
            트렌딩
          </a>
        </Link>
        <Link href={{ pathname: '/', query: { tab: 'recent' } }}>
          <a className={cx({ active: tab && tab === 'recent' })}>
            <MdAccessTime />
            최신
          </a>
        </Link>
        <Indicator style={springStyle} />
      </Block>
      <MobileMore ref={moreButtonRef}>
        <MdMoreVert className="more" onClick={toggle} />
      </MobileMore>
      <MainMobileHeadExtra visible={extra} onClose={onClose} />
    </Wrapper>
  );
}

export default MainTab;
