import { combineReducers } from '@reduxjs/toolkit';
import system from './system';

const rootReducer = combineReducers({
  system: system.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
