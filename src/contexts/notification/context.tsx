import React, { useMemo, useReducer } from 'react';
import { createContext } from '@libs/react-utils';
import { NotificationManager } from '@libs/state/notification-manager';

interface NotificationState {
  notification: NotificationManager;
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
    notification: new NotificationManager(),
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
