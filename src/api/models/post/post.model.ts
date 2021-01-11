export interface Post {
  id: string;
  title: string;
  body: string;
  thumbnail: string;
  is_markdown: boolean;
  is_temp: boolean;
  is_private: boolean;
  likes: number;
  views: number;
  user_id: string;
  user_thumbnail: string | null;
  username: string;
  tags: string[];
  display_name: string;
  created_at: number;
  updated_at: number;
}
