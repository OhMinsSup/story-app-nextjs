import type { Post } from './post.model';

export interface GetPostModelResponse {
  post: Post;
  comment_count: number;
}
