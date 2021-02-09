import produce from 'immer';
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { SystemState } from '../system';

export const showAuthModal: CaseReducer<SystemState, PayloadAction> = (
  state
) => {
  return produce(state, (draft) => {
    draft.auth.visible = true;
    draft.layer = true;
  });
};

export const closeAuthModal: CaseReducer<SystemState, PayloadAction> = (
  state
) => {
  return produce(state, (draft) => {
    draft.auth.visible = false;
    draft.layer = false;
  });
};
