import { Action } from '@ngrx/store';

export const GET_USER = '[Shared] Get User';
export const SUCCESST_USER = '[Shared] Success User';
export const SET_PROGRESS = '[Shared] Set Progress';

export class GetUser implements Action {
  readonly type = GET_USER;
  constructor(public payload: string) { }
}

export class SuccessUser implements Action {
  readonly type = SUCCESST_USER;
  constructor(public payload: User) { }
}

export class SetProgress implements Action {
  readonly type = SET_PROGRESS;
  constructor(public payload: boolean) { }
}

export type All
  = GetUser
  | SuccessUser
  | SetProgress;
