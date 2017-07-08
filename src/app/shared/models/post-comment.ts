import { Post } from 'app/shared/models/post';
import { Tag } from 'app/shared/models/tag';
import { User } from 'app/shared/models/user';
import { Base } from 'app/shared/models/base';

export class PostComment extends Base {
  postCommentId: number;
  postId: number;
  post: Post;
  comment: string;
  tags: Tag[];
}
