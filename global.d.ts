/* eslint-disable @typescript-eslint/ban-types */
declare module '@multiavatar/multiavatar/esm' {
  export default function (arg: string, sansEnv?: any, ver?: any): string;
}

declare module 'react-query/types/react/QueryClientProvider' {
  interface QueryClientProviderProps {
    children?: ReactNode;
  }
}
