import React from 'react';
import { createGlobalStyle } from 'styled-components';
import palette from '~/libs/styles/palette';

const BackgroundStyle = createGlobalStyle`
  body {
    background: ${palette.gray0};
  }
`;

interface MainTemplateProps {
  children: React.ReactNode;
}
function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <BackgroundStyle />
      <div>{children}</div>
    </>
  );
}

export default MainTemplate;
