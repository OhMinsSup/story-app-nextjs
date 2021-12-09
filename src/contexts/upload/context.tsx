import React, { useReducer, useMemo } from 'react';
import { createContext } from '@libs/react-utils';

enum Action {
  SET_PROGRESS = 'SET_PROGRESS',
}

type ActionType = {
  type: Action.SET_PROGRESS;
  payload: number;
};

interface UploadState {
  progress: number;
}

interface UploadContext extends UploadState {
  setProgress: (progress: number) => void;
  dispatch: React.Dispatch<any>;
}

const initialState: UploadState = {
  progress: 0,
};

const [Provider, useUploadContext] = createContext<UploadContext>({
  name: 'useUploadContext',
  errorMessage: 'useUploadContext: `context` is undefined.',
  defaultValue: initialState,
});

interface UploadProps {
  children: React.ReactNode;
}

function reducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case Action.SET_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    default:
      return state;
  }
}

function UploadProvider({ children }: UploadProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setProgress = (progress: number) =>
    dispatch({ type: Action.SET_PROGRESS, payload: progress });

  const actions = useMemo(
    () => ({
      ...state,
      dispatch,
      setProgress,
    }),
    [state],
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { UploadProvider, useUploadContext };
