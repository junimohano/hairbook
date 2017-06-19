import { Post } from 'app/shared/models/post';
import { Tag } from 'app/shared/models/tag';
import { User } from 'app/shared/models/user';

export interface PostComment {
  postCommentId: number;
  postId: number;
  post: Post;
  comment: string;
  tags: Tag[];

  createdUserId: number | null;
  updatedUserId: number | null;
  createdUser: User | null;
  updatedUser: User | null;
  createdDate: Date | null;
  updatedDate: Date | null;
}
