import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '~/store/modules';

import EditorPanes from '~/components/write/EditorPanes';
import MarkdownEditorContainer from './MarkdownEditorContainer';
import MarkdownPreviewContainer from './MarkdownPreviewContainer';

interface ActiveEditorProps {}
function ActiveEditor(_: ActiveEditorProps) {
  const [newPost, setNewPost] = useState(false);
  const postId = useSelector((state: RootState) => state.write.postId);
  const [askLoadTemp, setAskLoadTemp] = useState(false);
  const initialized = useRef(false);

  const dispatch = useDispatch();

  return (
    <>
      <EditorPanes
        left={<MarkdownEditorContainer />}
        right={<MarkdownPreviewContainer />}
      />
    </>
  );
}

export default ActiveEditor;
