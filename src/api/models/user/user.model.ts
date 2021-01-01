export interface User {
  id: string;
  username: string;
  email: string;
  display_name: string;
  short_bio: string;
  thumbnail: string;
  email_notification: boolean;
  email_promotion: boolean;
  twitter: string;
  facebook: string;
  github: string;
  created_at: number;
  updated_at: number;
}
