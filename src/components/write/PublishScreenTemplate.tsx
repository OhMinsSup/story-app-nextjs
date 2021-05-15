import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import media from '~/libs/styles/media';
import palette from '~/libs/styles/palette';
import transitions from '~/libs/styles/transitions';
import zIndexes from '~/libs/styles/zIndexes';

const PublishScreenTemplateBlock = styled.div<{ visible: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  @media (max-width: 1024px) and (orientation: landscape) {
    align-items: flex-start;
    padding-top: 2rem;
    padding-bottom: 2rem;
    overflow: auto;
  }
  ${media.custom(767)} {
    align-items: flex-start;
    padding-top: 2rem;
    padding-bottom: 2rem;
    overflow: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${palette.gray0};
  z-index: ${zIndexes.PublishScreen};
  animation: ${transitions.slideUp} 0.25s forwards ease-in;
  ${(props) =>
    props.visible
      ? css`
          animation: ${transitions.slideUp} 0.25s forwards ease-in;
        `
      : css`
          animation: ${transitions.slideDown} 0.125s forwards ease-out;
        `}
`;

const Wrapper = styled.div`
  width: 768px;
  display: flex;
  ${media.medium} {
    width: 704px;
  }
  ${media.custom(767)} {
    flex-direction: column;
  }
`;

const Pane = styled.div`
  flex: 1;
  min-width: 0;
`;

const RightPane = styled(Pane)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Separator = styled.div`
  width: 1px;
  min-height: 425px;
  background: ${palette.gray2};
  margin-left: 2rem;
  margin-right: 2rem;
  ${media.custom(767)} {
    display: none;
  }
`;

interface PublishScreenTemplateProps {
  visible: boolean;
  left: React.ReactNode;
  right: React.ReactNode;
}

function PublishScreenTemplate({
  visible,
  left,
  right,
}: PublishScreenTemplateProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let timeoutId: null | ReturnType<typeof setTimeout> = null;
    if (visible) {
      setAnimate(true);
    } else if (!visible && animate) {
      timeoutId = setTimeout(() => {
        setAnimate(false);
      }, 125);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible, animate]);

  if (!visible && !animate) return null;

  return (
    <PublishScreenTemplateBlock visible={visible}>
      <Wrapper>
        <Pane>{left}</Pane>
        <Separator />
        <RightPane>{right}</RightPane>
      </Wrapper>
      {/* <HideScroll /> */}
    </PublishScreenTemplateBlock>
  );
}

export default PublishScreenTemplate;
