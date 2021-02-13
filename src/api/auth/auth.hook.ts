import useRequest from '~/libs/hooks/useRequest';
import { codeLogin, sendAuthEmail } from './auth.api';
import { CodeLoginResponse, SendAuthEmailResponse } from './auth.dto';

export function useSendEmailHook() {
  return useRequest<SendAuthEmailResponse>(sendAuthEmail);
}

export function useCodeLoginHook() {
  return useRequest<CodeLoginResponse>(codeLogin);
}
