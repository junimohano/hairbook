import { Action } from '@ngrx/store';
import { User } from 'app/shared/models/user';

export const SET_PROGRESS_BAR = '[Shared] Set Progress Bar';
export const SET_PROGRESS_SPINNER = '[Shared] Set Progress Spinner';
export const SET_SNACK_BAR = '[Shared] Set Snack Bar';

export class SetProgressBar implements Action {
  readonly type = SET_PROGRESS_BAR;
  constructor(public payload: boolean) { }
}

export class SetProgressSpinner implements Action {
  readonly type = SET_PROGRESS_SPINNER;
  constructor(public payload: boolean) { }
}

export class SetSnackBar implements Action {
  readonly type = SET_SNACK_BAR;
  constructor(public payload: string) { }
}

export type All
  = SetProgressBar
  | SetProgressSpinner
  | SetSnackBar;
