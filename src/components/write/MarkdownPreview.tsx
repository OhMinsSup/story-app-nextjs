import React from 'react';
import styled from 'styled-components';
import palette from '~/libs/styles/palette';
import MarkdownRender from '../common/MarkdownRender';

const MarkdownPreviewBlock = styled.div`
  word-break: break-word;
  padding: 3rem;
  flex: 1;
  overflow-y: auto;
  color: ${palette.gray9};
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 4rem;
  font-weight: 800;
`;

export interface MarkdownPreviewProps {
  markdown: string;
  title: string;
}

function MarkdownPreview({ markdown, title }: MarkdownPreviewProps) {
  return (
    <MarkdownPreviewBlock id="preview">
      <Title>{title}</Title>
      <MarkdownRender markdown={markdown} />
    </MarkdownPreviewBlock>
  );
}

export default MarkdownPreview;
