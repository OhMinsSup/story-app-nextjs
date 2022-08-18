// ================== Signup ================== //

export interface SignupBody {
  email: string;
  username: string;
  password: string;
  profileUrl?: string | null;
}

// ================== Signin ==================== //

export interface SigninBody {
  email: string;
  password: string;
}
