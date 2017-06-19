import { Action } from '@ngrx/store';

export const GET_USER = '[Shared] Get User';
export const SUCCESS_USER = '[Shared] Success User';
export const SET_PROGRESS_BAR = '[Shared] Set Progress Bar';
export const SET_PROGRESS_SPINNER = '[Shared] Set Progress Spinner';

export class GetUser implements Action {
  readonly type = GET_USER;
  constructor(public payload: string) { }
}

export class SuccessUser implements Action {
  readonly type = SUCCESS_USER;
  constructor(public payload: number) { }
}

export class SetProgressBar implements Action {
  readonly type = SET_PROGRESS_BAR;
  constructor(public payload: boolean) { }
}

export class SetProgressSpinner implements Action {
  readonly type = SET_PROGRESS_SPINNER;
  constructor(public payload: boolean) { }
}

export type All
  = GetUser
  | SuccessUser
  | SetProgressBar
  | SetProgressSpinner;
