import React, { useReducer, useMemo } from 'react';
import { createContext } from '@libs/react-utils';

enum Action {
  SET_ERROR = 'SET_ERROR',
}

type ActionType = {
  type: Action.SET_ERROR;
  payload: ErrorState | undefined;
};

interface ErrorState extends Record<string, any> {}

interface ErrorContext extends ErrorState {
  setError: (payload: ErrorState | undefined) => void;
  dispatch: React.Dispatch<ActionType>;
}

const initialState: ErrorState | undefined = undefined;

const [Provider, useErrorContext] = createContext<ErrorContext>({
  name: 'useErrorContext',
  errorMessage: 'useErrorContext: `context` is undefined.',
  defaultValue: initialState,
});

interface ErrorProps {
  children: React.ReactNode;
}

function reducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case Action.SET_ERROR:
      return action.payload;
    default:
      return state;
  }
}

function ErrorProvider({ children }: ErrorProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setError = (payload: ErrorState | undefined) => {
    dispatch({
      type: Action.SET_ERROR,
      payload,
    });
  };

  const actions = useMemo(
    () => ({
      ...state,
      setError,
      dispatch,
    }),
    [state],
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { ErrorProvider, useErrorContext };
