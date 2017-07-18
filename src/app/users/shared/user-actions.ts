import { Action } from '@ngrx/store';
import { User } from 'app/shared/models/user';

import { UserInfo } from './user-info';

export const GET_USER = '[Users] Get User';
export const GET_USER_SUCCESS = '[Users] Get User Success';
export const EDIT_USER = '[Users] Edit User';
export const EDIT_USER_IMAGE = '[Users] EDIT_USER_IMAGE';
export const EDIT_USER_IMAGE_SUCCESS = '[Users] EDIT_USER_IMAGE_SUCCESS';


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
  constructor(public payload: UserInfo) { }
}

export type All
  = GetUser
  | GetUserSuccess
  | EditUser
  | EditUserImage
  ;
