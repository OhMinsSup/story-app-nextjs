import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import produce from 'immer';
import { WriteState, initialState } from '../write';

export const changeTitle: CaseReducer<WriteState, PayloadAction<string>> = (
  state,
  { payload }
) => {
  return produce(state, (draft) => {
    draft.title = payload;
  });
};

export const changeMarkDown: CaseReducer<WriteState, PayloadAction<string>> = (
  state,
  { payload }
) => {
  return produce(state, (draft) => {
    draft.markdown = payload;
  });
};

export const changeTags: CaseReducer<WriteState, PayloadAction<string[]>> = (
  state,
  { payload }
) => {
  return produce(state, (draft) => {
    draft.tags = payload;
  });
};

export const clearEditor: CaseReducer<WriteState, PayloadAction> = () => {
  return initialState;
};

export const setInitialBody: CaseReducer<WriteState, PayloadAction<string>> = (
  state,
  { payload }
) => {
  return produce(state, (draft) => {
    draft.initialBody = payload;
  });
};

export const setInitialHead: CaseReducer<WriteState, PayloadAction<string>> = (
  state,
  { payload }
) => {
  return produce(state, (draft) => {
    draft.initialTitle = payload;
    draft.title = payload;
  });
};

export type PrepareEditPayload = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  description: string;
  urlSlug: string;
  isPrivate: boolean;
  isMarkdown: boolean;
  isTemp?: boolean;
  thumbnail: string | null;
};

export const prepareEdit: CaseReducer<
  WriteState,
  PayloadAction<PrepareEditPayload>
> = (state, { payload }) => {
  const {
    isMarkdown,
    body,
    title,
    tags,
    description,
    urlSlug,
    id,
    isPrivate,
    isTemp,
    thumbnail,
  } = payload;
  const key = isMarkdown ? 'markdown' : 'html';
  return produce(state, (draft) => {
    draft.title = title;
    draft.tags = tags;
    draft.description = description.slice(0, 150);
    draft.urlSlug = urlSlug;
    draft.isPrivate = isPrivate;
    draft.isTemp = isTemp || false;
    draft[key] = body;
    draft.postId = id;
    draft.initialBody = body;
    draft.initialTitle = title;
    draft.thumbnail = thumbnail;
  });
};
