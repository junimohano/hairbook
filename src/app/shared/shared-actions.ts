import { Action } from '@ngrx/store';
import { User } from 'app/shared/models/user';
import { PostComment } from 'app/shared/models/post-comment';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { Post } from 'app/shared/models/post';
import { PostSearchInfo } from 'app/shared/models/post-search-info';
import { PostCommentInfo } from 'app/shared/models/post-comment-info';

export const SET_PROGRESS_BAR = '[Shared] Set Progress Bar';
export const SET_PROGRESS_SPINNER = '[Shared] Set Progress Spinner';
export const SET_SNACK_BAR = '[Shared] Set Snack Bar';
export const SEARCH_POST = '[Shared] Search Post';
export const SUCCESS_POST = '[Shared] Success Post';
export const PREVIOUS_UPLOAD_INDEX = '[Shared] Previous Upload Index';
export const NEXT_UPLOAD_INDEX = '[Shared] Next Upload Index';
export const RESET_STATE = '[Shared] Reset State';
export const GET_POST = '[Shared] Get Post';
export const GET_POST_SUCCESS = '[Shared] Get Post Success';
export const ADD_POST_COMMENT = '[Shared] Add Post Comment';
export const ADD_POST_COMMENT_SUCCESS = '[Shared] Add Post Comment Success';
export const DEL_POST_COMMENT = '[Shared] Del Post Comment';
export const DEL_POST_COMMENT_SUCCESS = '[Shared] Del Post Comment Success';
export const ADD_POST_EVALUATION = '[Shared] Add Post Evaluation';
export const ADD_POST_EVALUATION_SUCCESS = '[Shared] Add Post Evaluation Success';
export const DEL_POST_EVALUATION = '[Shared] Del Post Evaluation';
export const DEL_POST_EVALUATION_SUCCESS = '[Shared] Del Post Evaluation Success';
export const GET_POST_COMMENT = '[Shared] Get Post Comment';
export const GET_POST_COMMENT_SUCCESS = '[Shared] Get Post Comment Success';
export const GO_POST_EDIT_PAGE = '[Shared] GO_POST_EDIT_PAGE';
export const DEL_POST = '[Shared] DEL_POST';
export const DEL_POST_SUCCESS = '[Shared] DEL_POST_SUCCESS';

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
  constructor(public payload: Response) { }
}

export class SearchPost implements Action {
  readonly type = SEARCH_POST;
  constructor(public payload: PostSearchInfo) { }
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

export class GetPostComment implements Action {
  readonly type = GET_POST_COMMENT;
  constructor(public payload: Post) { }
}

export class GetPostCommentSuccess implements Action {
  readonly type = GET_POST_COMMENT_SUCCESS;
  constructor(public payload: PostCommentInfo) { }
}

export class GoPostEditPage implements Action {
  readonly type = GO_POST_EDIT_PAGE;
  constructor(public payload: number) { }
}

export class DelPost implements Action {
  readonly type = DEL_POST;
  constructor(public payload: number) { }
}

export class DelPostSuccess implements Action {
  readonly type = DEL_POST_SUCCESS;
  constructor(public payload: number) { }
}

export type All
  = SetProgressBar
  | SetProgressSpinner
  | SetSnackBar
  | SearchPost
  | SuccessPost
  | PreviousUploadIndex
  | NextUploadIndex
  | ResetState
  | GetPost
  | GetPostSuccess
  | AddPostComment
  | AddPostCommentSuccess
  | DelPostComment
  | DelPostCommentSuccess
  | AddPostEvaluation
  | AddPostEvaluationSuccess
  | DelPostEvaluation
  | DelPostEvaluationSuccess
  | GetPostComment
  | GetPostCommentSuccess
  | GoPostEditPage
  | DelPost
  | DelPostSuccess
  ;
