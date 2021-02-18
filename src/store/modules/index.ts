import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import system from './system';
import write from './write';

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

export default rootReducer;
