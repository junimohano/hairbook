import { Action } from '@ngrx/store';

export const SEARCH_POST = '[Posts] Post';
export const SUCCESS_POST = '[Posts] Success Post';

export class SearchPost implements Action {
  readonly type = SEARCH_POST;
  constructor() { }
}

export class SuccessPost implements Action {
  readonly type = SUCCESS_POST;
  constructor(public payload: Post[]) { }
}

export type All
  = SearchPost
  | SuccessPost;
