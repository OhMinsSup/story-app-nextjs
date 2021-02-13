import { APIResponse } from '../common/common.dto';

export type SendAuthEmailResponse = APIResponse<{ registered: boolean }>;

export type CodeLoginResponse = APIResponse<
  Partial<{
    email: string;
    registerToken: string;
    id: string;
    accessToken: string;
    refreshToken: string;
  }>
>;
