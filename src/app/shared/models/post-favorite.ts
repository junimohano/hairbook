import { Base } from './base';
import { Post } from './post';

export class PostFavorite extends Base {
  postFavoriteId: number;

  postId: number;
  post: Post;
}
