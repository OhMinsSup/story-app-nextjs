import React, { useReducer, useMemo } from 'react';
import { createContext } from '@libs/react-utils/context';

enum Action {
  SET_VISIBLE_SUBTITLE = 'SET_VISIBLE_SUBTITLE',
  SET_VISIBLE_TAGS = 'SET_VISIBLE_TAGS',
  SET_VISIBLE_UPLOAD = 'SET_VISIBLE_UPLOAD',
}

type SetVisibleSubTitleType = {
  type: Action.SET_VISIBLE_SUBTITLE;
  payload: boolean;
};

type SetVisibleTagsType = {
  type: Action.SET_VISIBLE_TAGS;
  payload: boolean;
};

type SetVisibleUploadType = {
  type: Action.SET_VISIBLE_UPLOAD;
  payload: boolean;
};

type ActionType =
  | SetVisibleSubTitleType
  | SetVisibleTagsType
  | SetVisibleUploadType;

interface ClientState {
  editor: {
    subTitle: boolean;
    tags: boolean;
    upload: boolean;
  };
}

interface ClientContext extends ClientState {
  setVisibleSubTitle: (payload: boolean) => void;
  setVisibleTags: (payload: boolean) => void;
  setVisibleUpload: (payload: boolean) => void;
  dispatch: React.Dispatch<ActionType>;
}

const initialState: ClientState = {
  editor: {
    subTitle: false,
    tags: false,
    upload: false,
  },
};

const [Provider, useClientContext] = createContext<ClientContext>({
  name: 'useClientContext',
  errorMessage: 'useClientContext: `context` is undefined.',
  defaultValue: initialState,
});

interface ClientProps {
  children: React.ReactNode;
}

function reducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case Action.SET_VISIBLE_SUBTITLE:
      return {
        ...state,
        editor: {
          ...state.editor,
          subTitle: action.payload,
        },
      };
    case Action.SET_VISIBLE_TAGS:
      return {
        ...state,
        editor: {
          ...state.editor,
          tags: action.payload,
        },
      };
    case Action.SET_VISIBLE_UPLOAD:
      return {
        ...state,
        editor: {
          ...state.editor,
          upload: action.payload,
        },
      };
    default:
      return state;
  }
}

function ClientProvider({ children }: ClientProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setVisibleSubTitle = (payload: boolean) => {
    dispatch({
      type: Action.SET_VISIBLE_SUBTITLE,
      payload,
    });
  };

  const setVisibleTags = (payload: boolean) => {
    dispatch({
      type: Action.SET_VISIBLE_TAGS,
      payload,
    });
  };

  const setVisibleUpload = (payload: boolean) => {
    dispatch({
      type: Action.SET_VISIBLE_UPLOAD,
      payload,
    });
  };

  const actions = useMemo(
    () => ({
      ...state,
      setVisibleSubTitle,
      setVisibleTags,
      setVisibleUpload,
      dispatch,
    }),
    [state],
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { ClientProvider, useClientContext };
