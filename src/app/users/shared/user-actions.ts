import { Action } from '@ngrx/store';
import { User } from 'app/shared/models/user';

import { UserFriend } from '../../shared/models/user-friend';
import { UserUploadInfo } from './user-upload-info';

export const GET_USER = '[Users]GET_USER';
export const GET_USER_SUCCESS = '[Users] GET_USER_SUCCESS';
export const EDIT_USER = '[Users] EDIT_USER';
export const EDIT_USER_IMAGE = '[Users] EDIT_USER_IMAGE';
export const ADD_USER_FRIEND = '[Shared] ADD_USER_FRIEND';
export const ADD_USER_FRIEND_SUCCESS = '[Shared] ADD_USER_FRIEND_SUCCESS';
export const DEL_USER_FRIEND = '[Shared] DEL_USER_FRIEND';
export const DEL_USER_FRIEND_SUCCESS = '[Shared] DEL_USER_FRIEND_SUCCESS';

export class GetUser implements Action {
  readonly type = GET_USER;
  constructor(public payload: string) { }
}

export class GetUserSuccess implements Action {
  readonly type = GET_USER_SUCCESS;
  constructor(public payload: User) { }
}

export class EditUser implements Action {
  readonly type = EDIT_USER;
  constructor(public payload: User) { }
}

export class EditUserImage implements Action {
  readonly type = EDIT_USER_IMAGE;
  constructor(public payload: UserUploadInfo) { }
}

export class AddUserFriend implements Action {
  readonly type = ADD_USER_FRIEND;
  constructor(public payload: UserFriend) { }
}

export class AddUserFriendSuccess implements Action {
  readonly type = ADD_USER_FRIEND_SUCCESS;
  constructor(public payload: UserFriend) { }
}

export class DelUserFriend implements Action {
  readonly type = DEL_USER_FRIEND;
  constructor(public payload: number) { }
}

export class DelUserFriendSuccess implements Action {
  readonly type = DEL_USER_FRIEND_SUCCESS;
  constructor(public payload: UserFriend) { }
}

export type All
  = GetUser
  | GetUserSuccess
  | EditUser
  | EditUserImage
  | AddUserFriend
  | AddUserFriendSuccess
  | DelUserFriend
  | DelUserFriendSuccess
  ;
