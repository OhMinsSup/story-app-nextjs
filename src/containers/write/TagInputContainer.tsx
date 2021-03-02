import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/modules';
import write from '~/store/modules/write';
import TagInput from '../../components/write/TagInput';

function TagInputContainer() {
  const dispatch = useDispatch();
  const tags = useSelector((state: RootState) => state.write.tags);

  const onChangeTags = useCallback((tags: string[]) => {
    dispatch(write.actions.changeTags(tags));
  }, []);

  return <TagInput tags={tags} onChange={onChangeTags} />;
}

export default TagInputContainer;
