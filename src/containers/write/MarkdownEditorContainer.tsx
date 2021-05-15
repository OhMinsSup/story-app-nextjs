import { bindActionCreators } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import remark from 'remark';
import strip from 'strip-markdown';

import WriteMarkdownEditor from '~/components/write/WriteMarkdownEditor';
import { RootState } from '~/store/modules';
import write from '~/store/modules/write';
import WriteFooter from '~/components/write/WriteFooter';
import TagInputContainer from './TagInputContainer';

interface MarkdownEditorContainerProps {}
function MarkdownEditorContainer(_: MarkdownEditorContainerProps) {
  const dispatch = useDispatch();
  const router = useRouter();

  const onGoBack = () => {
    router.back();
  };

  const actionCreators = useMemo(
    () =>
      bindActionCreators(
        {
          openPublish: write.actions.openPublish,
          changeTitle: write.actions.changeTitle,
          changeMarkdown: write.actions.changeMarkDown,
          setDefaultDescription: write.actions.setDefaultDescription,
        },
        dispatch
      ),
    [dispatch]
  );

  const { title, initialBody, initialTitle, markdown, postId } = useSelector(
    (state: RootState) => state.write
  );

  const [, setLastSavedData] = useState({
    title: initialTitle,
    body: initialBody,
  });

  const onPublish = useCallback(() => {
    remark()
      .use(strip)
      .process(markdown.replace(/#(.*?)\n/g, ''), (err: any, file: any) => {
        const text = String(file);
        const sliced = text.replace(/\n/g, '').slice(0, 150);
        actionCreators.setDefaultDescription(sliced);
        actionCreators.openPublish();
      });
  }, [actionCreators, markdown]);

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
        title={title}
        initialBody={initialBody}
        onChangeTitle={actionCreators.changeTitle}
        onChangeMarkdown={actionCreators.changeMarkdown}
        tagInput={<TagInputContainer />}
        footer={
          <WriteFooter
            onTempSave={() => console.log('call')}
            onGoBack={onGoBack}
            onPublish={onPublish}
            edit={!!postId}
          />
        }
      />
    </>
  );
}

export default MarkdownEditorContainer;
