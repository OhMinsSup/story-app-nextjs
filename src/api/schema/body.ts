// ================== Signup ================== //

export interface SignupBody {
  email: string;
  username: string;
  password: string;
  profileUrl?: string | null;
}

// ================== Login ==================== //

export interface LoginBody {
  email: string;
  password: string;
  deviceId?: number;
}
