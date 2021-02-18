import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import produce from 'immer';
import { WriteState } from '../write';

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
