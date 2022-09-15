// ============== User =================== //

export interface UserSchema {
  id: number;
  email: string;
  username: string;
  profileUrl?: string | null;
  lastActiveAt?: string;
  lastActiveIp?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  wallet: WalletSchema;
}

// ============== Wallet =================== //

export interface WalletSchema {
  id: number;
  address: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
