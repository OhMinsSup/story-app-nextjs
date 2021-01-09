export interface WritePostModelResponse {
  post_id: string;
}

export interface WritePostModelRequsetBody {
  title: string;
  body: string;
  is_markdown: boolean;
  is_temp: boolean;
  is_private: boolean;
  tags: string[];
  thumbnail?: string;
}
