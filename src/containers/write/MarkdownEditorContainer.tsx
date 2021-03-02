import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import WriteMarkdownEditor from '~/components/write/WriteMarkdownEditor';
import { RootState } from '~/store/modules';
import write from '~/store/modules/write';
import TagInputContainer from './TagInputContainer';

interface MarkdownEditorContainerProps {
  isServer: boolean;
}
function MarkdownEditorContainer({ isServer }: MarkdownEditorContainerProps) {
  const dispatch = useDispatch();

  const actionCreatros = useMemo(
    () =>
      bindActionCreators(
        {
          changeTitle: write.actions.changeTitle,
          changeMarkdown: write.actions.changeMarkDown,
        },
        dispatch
      ),
    [dispatch]
  );

  const { title, initialBody, initialTitle } = useSelector(
    (state: RootState) => state.write
  );

  const [lastSavedData, setLastSavedData] = useState({
    title: initialTitle,
    body: initialBody,
  });
  console.log(lastSavedData);

  useEffect(() => {
    setLastSavedData({
      title: initialTitle,
      body: initialBody,
    });
  }, [initialBody, initialTitle]);

  return (
    <>
      <Helmet>
        <title>{title ? `(작성중) ${title}` : '새 글 작성'}</title>
      </Helmet>
      <WriteMarkdownEditor
        isServer={isServer}
        title={title}
        initialBody={initialBody}
        onChangeTitle={actionCreatros.changeTitle}
        onChangeMarkdown={actionCreatros.changeMarkdown}
        tagInput={<TagInputContainer />}
      />
    </>
  );
}

export default MarkdownEditorContainer;
