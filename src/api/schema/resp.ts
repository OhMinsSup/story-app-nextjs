import type { Api, LoginSchema } from './story-api';

// signup response model
export type SignupResp = Api<string | boolean>;

// signin response model
export type SigninResp = Api<LoginSchema>;
