import React from 'react';
import EditorPanes from '~/components/write/EditorPanes';
import MarkdownEditorContainer from './MarkdownEditorContainer';

interface ActiveEditorProps {
  isServer: boolean;
}
function ActiveEditor({ isServer }: ActiveEditorProps) {
  return (
    <>
      <EditorPanes
        left={<MarkdownEditorContainer isServer={isServer} />}
        right={<div>right</div>}
      />
    </>
  );
}

export default ActiveEditor;
