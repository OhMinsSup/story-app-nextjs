import { CombinedState, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import system, { SystemState } from './system';
import write, { WriteState } from './write';

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        system: system.reducer,
        write: write.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export type RootState = CombinedState<{
  system: SystemState;
  write: WriteState;
}>;

export default rootReducer;
