import { APIResponse } from '../common/common.dto';

export type SendAuthEmailResponse = APIResponse<{ registered: boolean }>;
