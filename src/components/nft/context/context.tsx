import React, { useReducer, useMemo } from 'react';
import { createContext } from '@libs/react-utils/context';

enum Action {
  SET_VISIBLE_TAGS = 'SET_VISIBLE_TAGS',
  SET_VISIBLE_UPLOAD = 'SET_VISIBLE_UPLOAD',
  SET_UPLOADED_IMAGE = 'SET_UPLOADED_IMAGE',
}

type SetVisibleTagsType = {
  type: Action.SET_VISIBLE_TAGS;
  payload: boolean;
};

type SetVisibleUploadType = {
  type: Action.SET_VISIBLE_UPLOAD;
  payload: boolean;
};

type SetUploadedImageType = {
  type: Action.SET_UPLOADED_IMAGE;
  payload: UploadImage;
};

type ActionType =
  | SetVisibleTagsType
  | SetVisibleUploadType
  | SetUploadedImageType;

interface UploadImage {
  idx: number;
  name: string;
  contentUrl: string;
}

interface ModuleState {
  editor: {
    tags: boolean;
    upload: boolean;
  };
  upload: {
    image: UploadImage | null;
  };
}

interface ModuleContext extends ModuleState {
  setVisibleTags: (payload: boolean) => void;
  setVisibleUpload: (payload: boolean) => void;
  setUploadedImage: (payload: UploadImage) => void;
  dispatch: React.Dispatch<ActionType>;
}

const initialState: ModuleState = {
  editor: {
    tags: false,
    upload: false,
  },
  upload: {
    image: null,
  },
};

const [Provider, useModuleContext] = createContext<ModuleContext>({
  name: 'useModuleContext',
  errorMessage: 'useModuleContext: `context` is undefined.',
  defaultValue: initialState,
});

interface Props {
  children: React.ReactNode;
}

function reducer(state = initialState, action: ActionType) {
  switch (action.type) {
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
    case Action.SET_UPLOADED_IMAGE:
      return {
        ...state,
        upload: {
          ...state.upload,
          image: action.payload,
        },
      };
    default:
      return state;
  }
}

function ModuleProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const setUploadedImage = (payload: UploadImage) => {
    dispatch({
      type: Action.SET_UPLOADED_IMAGE,
      payload,
    });
  };

  const actions = useMemo(
    () => ({
      ...state,
      setVisibleTags,
      setVisibleUpload,
      setUploadedImage,
      dispatch,
    }),
    [state],
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { ModuleProvider, useModuleContext };
