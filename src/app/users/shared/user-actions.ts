import { Action } from '@ngrx/store';
import { Post } from 'app/shared/models/post';

export const SEARCH_POST = '[Users] Post';
export const SUCCESS_POST = '[Users] Success Post';
export const PREVIOUS_UPLOAD_INDEX = '[Users] Previous Upload Index';
export const NEXT_UPLOAD_INDEX = '[Users] Next Upload Index';

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

export type All
  = SearchPost
  | SuccessPost
  | PreviousUploadIndex
  | NextUploadIndex;
