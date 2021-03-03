import React from 'react';
import { useSelector } from 'react-redux';
import MarkdownPreview from '~/components/write/MarkdownPreview';
import { RootState } from '~/store/modules';

function MarkdownPreviewContainer() {
  const { markdown, title } = useSelector((state: RootState) => ({
    markdown: state.write.markdown,
    title: state.write.title,
  }));

  return <MarkdownPreview title={title} markdown={markdown} />;
}

export default MarkdownPreviewContainer;
