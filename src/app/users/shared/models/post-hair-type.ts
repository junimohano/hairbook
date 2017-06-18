import { Post } from 'app/users/shared/models/post';
import { HairType } from 'app/users/shared/models/hair-type';
import { User } from 'app/users/shared/models/user';

export interface PostHairType {
  postHairTypeId: number;
  postId: number;
  post: Post;
  hairTypeId: number;
  hairType: HairType;

  createdUserId: number | null;
  updatedUserId: number | null;
  createdUser: User | null;
  updatedUser: User | null;
  createdDate: Date | null;
  updatedDate: Date | null;
}
