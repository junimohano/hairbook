import { Post } from 'app/users/shared/models/post';
import { HairMenu } from 'app/users/shared/models/hair-menu';
import { HairSubMenu } from 'app/users/shared/models/hair-sub-menu';
import { User } from 'app/users/shared/models/user';

export interface PostHairMenu {
  postHairMenuId: number;
  postId: number;
  post: Post;
  hairMenuId: number;
  hairMenu: HairMenu;
  hairSubMenuId: number | null;
  hairSubMenu: HairSubMenu | null;
  memo: string;
  drawing: ByteString;

  createdUserId: number | null;
  updatedUserId: number | null;
  createdUser: User | null;
  updatedUser: User | null;
  createdDate: Date | null;
  updatedDate: Date | null;
}


