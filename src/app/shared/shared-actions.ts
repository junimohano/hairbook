import { Action } from '@ngrx/store';

export const GET_USER = '[Shared] Get User';
export const SUCCESS_USER = '[Shared] Success User';
export const SET_PROGRESS = '[Shared] Set Progress';
export const SET_CIRCLE_PROGRESS = '[Shared] Set Circle Progress';

export class GetUser implements Action {
  readonly type = GET_USER;
  constructor(public payload: string) { }
}

export class SuccessUser implements Action {
  readonly type = SUCCESS_USER;
  constructor(public payload: number) { }
}

export class SetProgress implements Action {
  readonly type = SET_PROGRESS;
  constructor(public payload: boolean) { }
}

export class SetCircleProgress implements Action {
  readonly type = SET_CIRCLE_PROGRESS;
  constructor(public payload: boolean) { }
}

export type All
  = GetUser
  | SuccessUser
  | SetProgress
  | SetCircleProgress;
