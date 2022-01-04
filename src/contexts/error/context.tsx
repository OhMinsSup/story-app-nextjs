import React, { useReducer, useMemo } from 'react';
import { createContext } from '@libs/react-utils';
import { AxiosError } from 'axios';
import { Schema } from '@api/schema/story-api';
import { isAxiosError } from '@utils/utils';

enum Action {
  SET_AXIOS_ERROR = 'SET_AXIOS_ERROR',
  SET_BASIC_ERROR = 'SET_BASIC_ERROR',
  SET_RESET_ERROR = 'SET_RESET_ERROR',
}

type ActionType =
  | {
      type: Action.SET_AXIOS_ERROR;
      payload: ErrorState;
    }
  | {
      type: Action.SET_BASIC_ERROR;
      payload: ErrorState;
    }
  | {
      type: Action.SET_RESET_ERROR;
    };

interface ErrorState {
  name: string | null;
  httpCode: number | null;
  serviceCode: number | null;
  message: string | null;
}

interface ErrorContext extends ErrorState {
  setGlobalError: (error: AxiosError<Schema<any>> | Error) => void;
  setResetError: () => void;
  dispatch: React.Dispatch<any>;
}

const initialState: ErrorState = {
  name: null,
  httpCode: null,
  serviceCode: null,
  message: null,
};

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
    case Action.SET_AXIOS_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case Action.SET_BASIC_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    case Action.SET_RESET_ERROR:
      return initialState;
    default:
      return state;
  }
}

function ErrorProvider({ children }: ErrorProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setGlobalError = (error: AxiosError<Schema<any>> | Error) => {
    if (isAxiosError(error)) {
      const { response } = error;

      const msg = {
        name: error.message,
        httpCode: response?.status ?? null,
        serviceCode: response?.data?.resultCode ?? null,
        message:
          response?.data?.message ??
          '에러가 발생했습니다.\n다시 시도해 주세요.',
      };

      dispatch({
        type: Action.SET_AXIOS_ERROR,
        payload: msg,
      });
      return;
    }

    dispatch({
      type: Action.SET_BASIC_ERROR,
      payload: {
        name: error.name,
        httpCode: null,
        serviceCode: null,
        message: error.message,
      },
    });
  };

  const setResetError = () => {
    dispatch({
      type: Action.SET_RESET_ERROR,
    });
  };

  const actions = useMemo(
    () => ({
      ...state,
      setGlobalError,
      setResetError,
      dispatch,
    }),
    [state],
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { ErrorProvider, useErrorContext };
