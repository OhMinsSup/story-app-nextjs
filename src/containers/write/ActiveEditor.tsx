import React from 'react';
import EditorPanes from '~/components/write/EditorPanes';
import MarkdownEditorContainer from './MarkdownEditorContainer';
import MarkdownPreviewContainer from './MarkdownPreviewContainer';

interface ActiveEditorProps {
  isServer: boolean;
}
function ActiveEditor({ isServer }: ActiveEditorProps) {
  return (
    <>
      <EditorPanes
        left={<MarkdownEditorContainer isServer={isServer} />}
        right={<MarkdownPreviewContainer />}
      />
    </>
  );
}

export default ActiveEditor;
