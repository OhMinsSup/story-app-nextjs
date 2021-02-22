import React from 'react';
import WriteMarkdownEditor from '~/components/write/WriteMarkdownEditor';

interface MarkdownEditorContainerProps {
  isServer: boolean;
}
function MarkdownEditorContainer({ isServer }: MarkdownEditorContainerProps) {
  return (
    <>
      <WriteMarkdownEditor isServer={isServer} />
    </>
  );
}

export default MarkdownEditorContainer;
