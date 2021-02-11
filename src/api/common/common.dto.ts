export type APIResponse<Data = any> = {
  code: number;
  result_code: number;
  result_message: string;
  message: string;
  data: Data;
};
