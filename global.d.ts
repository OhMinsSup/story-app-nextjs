import { FireBaseManager } from '@libs/firebase-manager';
import { NotifyManager } from '@libs/state/notifyManager';

/* eslint-disable @typescript-eslint/ban-types */
declare module '@multiavatar/multiavatar/esm' {
  export default function (arg: string, sansEnv?: any, ver?: any): string;
}

declare module 'react-query/types/react/QueryClientProvider' {
  interface QueryClientProviderProps {
    children?: ReactNode;
  }
}

declare global {
  interface Window {
    firebaseManager: FireBaseManager;
    notifyManager: NotifyManager;
  }
}
