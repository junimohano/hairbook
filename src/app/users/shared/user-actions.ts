import { Action } from '@ngrx/store';
import { Post } from 'app/shared/models/post';
import { User } from 'app/shared/models/user';
import { PostSearchInfo } from 'app/shared/models/post-search-info';
import { PostComment } from 'app/shared/models/post-comment';
import { PostEvaluation } from 'app/shared/models/post-evaluation';

export const GET_USER = '[Users] Get User';
export const GET_USER_SUCCESS = '[Users] Get User Success';
export const EDIT_USER = '[Users] Edit User';


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

export type All
  = GetUser
  | GetUserSuccess
  | EditUser
  ;
