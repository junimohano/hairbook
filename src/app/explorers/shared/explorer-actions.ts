import { Action } from '@ngrx/store';
import { Post } from 'app/shared/models/post';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { PostComment } from 'app/shared/models/post-comment';

export const SEARCH_POST = '[Explorer] Post';
export const SUCCESS_POST = '[Explorer] Success Post';
export const PREVIOUS_UPLOAD_INDEX = '[Explorer] Previous Upload Index';
export const NEXT_UPLOAD_INDEX = '[Explorer] Next Upload Index';
export const GET_POST = '[Explorer] Get Post';
export const GET_POST_SUCCESS = '[Explorer] Get Post Success';
export const ADD_POST_COMMENT = '[Explorer] Add Post Comment';
export const ADD_POST_COMMENT_SUCCESS = '[Explorer] Add Post Comment Success';
export const DEL_POST_COMMENT = '[Explorer] Del Post Comment';
export const DEL_POST_COMMENT_SUCCESS = '[Explorer] Del Post Comment Success';
export const ADD_POST_EVALUATION = '[Explorer] Add Post Evaluation';
export const ADD_POST_EVALUATION_SUCCESS = '[Explorer] Add Post Evaluation Success';
export const DEL_POST_EVALUATION = '[Explorer] Del Post Evaluation';
export const DEL_POST_EVALUATION_SUCCESS = '[Explorer] Del Post Evaluation Success';

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

export class GetPost implements Action {
  readonly type = GET_POST;
  constructor(public payload: number) { }
}

export class GetPostSuccess implements Action {
  readonly type = GET_POST_SUCCESS;
  constructor(public payload: Post) { }
}

export class AddPostComment implements Action {
  readonly type = ADD_POST_COMMENT;
  constructor(public payload: PostComment) { }
}

export class AddPostCommentSuccess implements Action {
  readonly type = ADD_POST_COMMENT_SUCCESS;
  constructor(public payload: PostComment) { }
}

export class DelPostComment implements Action {
  readonly type = DEL_POST_COMMENT;
  constructor(public payload: number) { }
}

export class DelPostCommentSuccess implements Action {
  readonly type = DEL_POST_COMMENT_SUCCESS;
  constructor(public payload: PostComment) { }
}

export class AddPostEvaluation implements Action {
  readonly type = ADD_POST_EVALUATION;
  constructor(public payload: PostEvaluation) { }
}

export class AddPostEvaluationSuccess implements Action {
  readonly type = ADD_POST_EVALUATION_SUCCESS;
  constructor(public payload: PostEvaluation) { }
}

export class DelPostEvaluation implements Action {
  readonly type = DEL_POST_EVALUATION;
  constructor(public payload: number) { }
}

export class DelPostEvaluationSuccess implements Action {
  readonly type = DEL_POST_EVALUATION_SUCCESS;
  constructor(public payload: PostEvaluation) { }
}

export type All
  = SearchPost
  | SuccessPost
  | PreviousUploadIndex
  | NextUploadIndex
  | GetPost
  | GetPostSuccess
  | AddPostComment
  | AddPostCommentSuccess
  | DelPostComment
  | DelPostCommentSuccess
  | AddPostEvaluation
  | AddPostEvaluationSuccess
  | DelPostEvaluation
  | DelPostEvaluationSuccess;
