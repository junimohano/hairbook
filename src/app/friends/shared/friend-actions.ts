import { Action } from '@ngrx/store';
import { FriendSearchInfo } from 'app/friends/shared/friend-search-info';

import { User } from '../../shared/models/user';
import { UserFriend } from '../../shared/models/user-friend';

export const SEARCH_FRIENDS = '[Friend] SEARCH_FRIENDS';
export const SEARCH_FRIENDS_SUCCESS = '[Friend] SEARCH_FRIENDS_SUCCESS';

export class SearchFriends implements Action {
  readonly type = SEARCH_FRIENDS;
  constructor(public payload: FriendSearchInfo) { }
}

export class SearchFriendsSuccess implements Action {
  readonly type = SEARCH_FRIENDS_SUCCESS;
  constructor(public payload: User[]) { }
}

export type All
  = SearchFriends
  | SearchFriendsSuccess
  ;
