import useRequest from '~/libs/hooks/useRequest';
import { sendAuthEmail } from './auth.api';
import { SendAuthEmailResponse } from './auth.dto';

export default function useSendEmailHook() {
  return useRequest<SendAuthEmailResponse>(sendAuthEmail);
}
