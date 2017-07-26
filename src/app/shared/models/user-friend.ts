import { Base } from './base';
import { User } from './user';

export class UserFriend extends Base {
  userFriendId: number;

  friendId: number;
  Friend: User;
}
