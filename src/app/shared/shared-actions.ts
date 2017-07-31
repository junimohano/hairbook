import { PostFavorite } from './models/post-favorite';
import { Action } from '@ngrx/store';
import { Post } from 'app/shared/models/post';
import { PostComment } from 'app/shared/models/post-comment';
import { PostCommentInfo } from 'app/shared/models/post-comment-info';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { PostSearchInfo } from 'app/shared/models/post-search-info';

export const NO_ACTION = '[Shared] NO_ACTION';
export const NAV_EXPLORERS = '[Shared] NAV_EXPLORERS';
export const NAV_EXPLORERS_POST = '[Shared] NAV_EXPLORERS_POST';
export const NAV_LOGIN_REGISTER = '[Shared] NAV_LOGIN_REGISTER';
export const NAV_LOGIN = '[Shared] NAV_LOGIN';
export const NAV_USERS = '[Shared] NAV_USERS';
export const NAV_USERS_POST = '[Shared] NAV_USERS_POST';
export const NAV_POSTS = '[Shared] NAV_POSTS';
export const NAV_FRIENDS_FOLLOWERS = '[Shared] NAV_FRIENDS_FOLLOWERS';
export const NAV_FRIENDS_FOLLOWING = '[Shared] NAV_FRIENDS_FOLLOWING';
export const SET_PROGRESS_BAR = '[Shared] SET_PROGRESS_BAR';
export const SET_PROGRESS_SPINNER = '[Shared] SET_PROGRESS_SPINNER';
export const SET_SNACK_BAR = '[Shared] SET_SNACK_BAR';
export const SEARCH_POSTS = '[Shared] SEARCH_POSTS';
export const SUCCESS_POSTS = '[Shared] SUCCESS_POSTS';
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
export const DEL_POST = '[Shared] DEL_POST';
export const DEL_POST_SUCCESS = '[Shared] DEL_POST_SUCCESS';
export const SET_IS_PREVENT_REFRESHING_POSTS = '[Shared] SET_IS_PREVENT_REFRESHING_POSTS';
export const SET_USERS_TAB_INDEX = '[Shared] SET_USERS_TAB_INDEX';
export const SET_EXPLORERS_TAB_INDEX = '[Shared] SET_EXPLORERS_TAB_INDEX';
export const GET_POST_FAVORITES = '[Shared] GET_POST_FAVORITES';
export const GET_POST_FAVORITES_SUCCESS = '[Shared] GET_POST_FAVORITES_SUCCESS';
export const ADD_POST_FAVORITE = '[Shared] ADD_POST_FAVORITE';
export const ADD_POST_FAVORITE_SUCCESS = '[Shared] ADD_POST_FAVORITE_SUCCESS';
export const DEL_POST_FAVORITE = '[Shared] DEL_POST_FAVORITE';
export const DEL_POST_FAVORITE_SUCCESS = '[Shared] DEL_POST_FAVORITE_SUCCESS';

export class NoAction implements Action {
  readonly type = NO_ACTION;
  constructor() { }
}

export class NavExplorers implements Action {
  readonly type = NAV_EXPLORERS;
  constructor() { }
}

export class NavExplorersPost implements Action {
  readonly type = NAV_EXPLORERS_POST;
  constructor(public payload: string) { }
}

export class NavLoginRegister implements Action {
  readonly type = NAV_LOGIN_REGISTER;
  constructor() { }
}

export class NavLogin implements Action {
  readonly type = NAV_LOGIN;
  constructor() { }
}

export class NavUsers implements Action {
  readonly type = NAV_USERS;
  constructor(public payload: string) { }
}

export class NavUsersPost implements Action {
  readonly type = NAV_USERS_POST;
  constructor(public payload: string) { }
}

export class NavPosts implements Action {
  readonly type = NAV_POSTS;
  constructor(public payload: string) { }
}

export class NavFriendsFollowers implements Action {
  readonly type = NAV_FRIENDS_FOLLOWERS;
  constructor() { }
}

export class NavFriendsFollowing implements Action {
  readonly type = NAV_FRIENDS_FOLLOWING;
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

export class SearchPosts implements Action {
  readonly type = SEARCH_POSTS;
  constructor(public payload: PostSearchInfo) { }
}

export class SuccessPosts implements Action {
  readonly type = SUCCESS_POSTS;
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

export class DelPost implements Action {
  readonly type = DEL_POST;
  constructor(public payload: number) { }
}

export class DelPostSuccess implements Action {
  readonly type = DEL_POST_SUCCESS;
  constructor(public payload: number) { }
}

export class SetIsPreventRefreshingPosts implements Action {
  readonly type = SET_IS_PREVENT_REFRESHING_POSTS;
  constructor(public payload: boolean) { }
}

export class SetUsersTabIndex implements Action {
  readonly type = SET_USERS_TAB_INDEX;
  constructor(public payload: number) { }
}

export class SetExplorersTabIndex implements Action {
  readonly type = SET_EXPLORERS_TAB_INDEX;
  constructor(public payload: number) { }
}

export class GetPostFavorites implements Action {
  readonly type = GET_POST_FAVORITES;
  constructor(public payload: PostSearchInfo) { }
}

export class GetPostFavoritesSuccess implements Action {
  readonly type = GET_POST_FAVORITES_SUCCESS;
  constructor(public payload: PostFavorite[]) { }
}

export class AddPostFavorite implements Action {
  readonly type = ADD_POST_FAVORITE;
  constructor(public payload: PostFavorite) { }
}

export class AddPostFavoriteSuccess implements Action {
  readonly type = ADD_POST_FAVORITE_SUCCESS;
  constructor(public payload: PostFavorite) { }
}

export class DelPostFavorite implements Action {
  readonly type = DEL_POST_FAVORITE;
  constructor(public payload: number) { }
}

export class DelPostFavoriteSuccess implements Action {
  readonly type = DEL_POST_FAVORITE_SUCCESS;
  constructor(public payload: PostFavorite) { }
}

export type All
  = NoAction
  | NavExplorers
  | NavExplorersPost
  | NavLoginRegister
  | NavLogin
  | NavUsers
  | NavUsersPost
  | NavPosts
  | NavFriendsFollowers
  | NavFriendsFollowing
  | SetProgressBar
  | SetProgressSpinner
  | SetSnackBar
  | SearchPosts
  | SuccessPosts
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
  | DelPost
  | DelPostSuccess
  | SetIsPreventRefreshingPosts
  | SetUsersTabIndex
  | SetExplorersTabIndex
  | GetPostFavorites
  | GetPostFavoritesSuccess
  | AddPostFavorite
  | AddPostFavoriteSuccess
  | DelPostFavorite
  | DelPostFavoriteSuccess
  ;
