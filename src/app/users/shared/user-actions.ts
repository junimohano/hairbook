import { Action } from '@ngrx/store';
import { Post } from 'app/shared/models/post';
import { User } from 'app/shared/models/user';

export const SEARCH_POST = '[Users] Post';
export const SUCCESS_POST = '[Users] Success Post';
export const PREVIOUS_UPLOAD_INDEX = '[Users] Previous Upload Index';
export const NEXT_UPLOAD_INDEX = '[Users] Next Upload Index';
export const RESET_STATE = '[Users] Reset State';
export const GET_USER = '[Users] Get User';
export const GET_USER_SUCCESS = '[Users] Get User Success';

export class SearchPost implements Action {
  readonly type = SEARCH_POST;
  constructor(public payload: string = null) { }
}

export class SuccessPost implements Action {
  readonly type = SUCCESS_POST;
  constructor(public payload: Post[]) { }
}

export class PreviousUploadIndex implements Action {
  readonly type = PREVIOUS_UPLOAD_INDEX;
  constructor(public payload: number) { }
}

export class NextUploadIndex implements Action {
  readonly type = NEXT_UPLOAD_INDEX;
  constructor(public payload: number) { }
}

export class ResetState implements Action {
  readonly type = RESET_STATE;
  constructor() { }
}

export class GetUser implements Action {
  readonly type = GET_USER;
  constructor(public payload: string) { }
}

export class GetUserSuccess implements Action {
  readonly type = GET_USER_SUCCESS;
  constructor(public payload: User) { }
}

export type All
  = SearchPost
  | SuccessPost
  | PreviousUploadIndex
  | NextUploadIndex
  | ResetState
  | GetUser
  | GetUserSuccess;
