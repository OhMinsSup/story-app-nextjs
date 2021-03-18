import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '~/store/modules';

import EditorPanes from '~/components/write/EditorPanes';
import MarkdownEditorContainer from './MarkdownEditorContainer';
import MarkdownPreviewContainer from './MarkdownPreviewContainer';
import { useRouter } from 'next/router';
import write from '~/store/modules/write';

interface ActiveEditorProps {
  post: any | null;
}
function ActiveEditor({ post }: ActiveEditorProps) {
  const postId = useSelector((state: RootState) => state.write.postId);
  // const [askLoadTemp, setAskLoadTemp] = useState(false);
  const initialized = useRef(false);

  const dispatch = useDispatch();
  const { query } = useRouter();

  // clear editor (clear store data)
  useEffect(() => {
    return () => {
      dispatch(write.actions.clearEditor());
    };
  }, [dispatch]);

  // Set Prepare Post Data (client side rendering)
  useEffect(() => {
    if (!post) return;
    if (initialized.current) return;
    dispatch(
      write.actions.prepareEdit({
        id: post.id,
        title: post.title,
        body: post.body,
        tags: post.tags,
        description: post.short_description,
        urlSlug: post.url_slug,
        isPrivate: post.is_private,
        isMarkdown: post.is_markdown,
        isTemp: post.is_temp,
        thumbnail: post.thumbnail,
      })
    );
    dispatch(write.actions.setInitialBody(post.body));
    initialized.current = true;
  }, [post]);

  if (query.slug && !post && !postId) return null;

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
