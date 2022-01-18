import React, { useMemo, useReducer } from 'react';
import { createContext } from '@libs/react-utils';
import { FireBaseManager } from '@libs/state/firebase-manager';

interface NotificationState {
  notification: FireBaseManager;
}

interface NotificationContext extends NotificationState {
  dispatch: React.Dispatch<any>;
}

const [Provider, useNotificationContext] = createContext<NotificationContext>({
  name: 'useNotificationContext',
  errorMessage: 'useNotificationContext: `context` is undefined.',
  defaultValue: {},
});

interface NotificationProps {
  children: React.ReactNode;
}

function reducer(state: NotificationState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}

function NotificationProvider({ children }: NotificationProps) {
  const [state, dispatch] = useReducer(reducer, {
    notification: new FireBaseManager(),
  });

  const actions = useMemo(
    () => ({
      ...state,
      dispatch,
    }),
    [state],
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { NotificationProvider, useNotificationContext };
