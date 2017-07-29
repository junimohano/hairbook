import { Base } from './base';
import { Post } from './post';

export class UserFavorite extends Base {
  userFavoriteId: number;

  postId: number;
  post: Post;
}
