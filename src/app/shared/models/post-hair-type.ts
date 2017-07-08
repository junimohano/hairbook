import { Post } from 'app/shared/models/post';
import { HairType } from 'app/shared/models/hair-type';
import { User } from 'app/shared/models/user';
import { Base } from 'app/shared/models/base';

export class PostHairType extends Base {
  postHairTypeId: number;
  postId: number;
  post: Post;
  hairTypeId: number;
  hairType: HairType;
}
