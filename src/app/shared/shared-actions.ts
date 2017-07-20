import { Action } from '@ngrx/store';
import { User } from 'app/shared/models/user';
import { PostComment } from 'app/shared/models/post-comment';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { Post } from 'app/shared/models/post';
import { PostSearchInfo } from 'app/shared/models/post-search-info';
import { PostCommentInfo } from 'app/shared/models/post-comment-info';

export const NO_ACTION = '[Shared] NO_ACTION';
export const SET_PROGRESS_BAR = '[Shared] SET_PROGRESS_BAR';
export const SET_PROGRESS_SPINNER = '[Shared] SET_PROGRESS_SPINNER';
export const SET_SNACK_BAR = '[Shared] SET_SNACK_BAR';
export const SEARCH_POST = '[Shared] SEARCH_POST';
export const SUCCESS_POST = '[Shared] SUCCESS_POST';
export const PREVIOUS_UPLOAD_INDEX = '[Shared] PREVIOUS_UPLOAD_INDEX';
export const NEXT_UPLOAD_INDEX = '[Shared] NEXT_UPLOAD_INDEX';
export const RESET_STATE = '[Shared] RESET_STATE';
export const GET_POST = '[Shared] GET_POST';
export const GET_POST_SUCCESS = '[Shared] GET_POST_SUCCESS';
export const ADD_POST_COMMENT = '[Shared] ADD_POST_COMMENT';
export const ADD_POST_COMMENT_SUCCESS = '[Shared] ADD_POST_COMMENT_SUCCESS';
export const DEL_POST_COMMENT = '[Shared] DEL_POST_COMMENT';
export const DEL_POST_COMMENT_SUCCESS = '[Shared] DEL_POST_COMMENT_SUCCESS';
export const ADD_POST_EVALUATION = '[Shared] ADD_POST_EVALUATION';
export const ADD_POST_EVALUATION_SUCCESS = '[Shared] ADD_POST_EVALUATION_SUCCESS';
export const DEL_POST_EVALUATION = '[Shared] DEL_POST_EVALUATION';
export const DEL_POST_EVALUATION_SUCCESS = '[Shared] DEL_POST_EVALUATION_SUCCESS';
export const GET_POST_COMMENT = '[Shared] GET_POST_COMMENT';
export const GET_POST_COMMENT_SUCCESS = '[Shared] GET_POST_COMMENT_SUCCESS';
export const GO_POST_EDIT_PAGE = '[Shared] GO_POST_EDIT_PAGE';
export const DEL_POST = '[Shared] DEL_POST';
export const DEL_POST_SUCCESS = '[Shared] DEL_POST_SUCCESS';
export const GO_USER_PAGE = '[Shared] GO_USER_PAGE';


export class NoAction implements Action {
  readonly type = NO_ACTION;
  constructor() { }
}

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

export class GoUserPage implements Action {
  readonly type = GO_USER_PAGE;
  constructor(public payload: string) { }
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
  | GoUserPage
  ;
