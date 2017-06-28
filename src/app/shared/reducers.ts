import * as ExplorerReducer from '../explorers/shared/explorer-reducer';
import * as UserReducer from '../users/shared/user-reducer';
import * as LoginReducer from '../logins/shared/login-reducer';
import * as SharedReducer from './shared-reducer';
import { User } from 'app/shared/models/user';
import { UserSecret } from 'app/logins/shared/user-secret';
import { routerReducer, RouterState } from '@ngrx/router-store';
import { PostSearchInfo } from 'app/shared/models/post-search-info';
import { Post } from 'app/shared/models/post';

export interface State {
  router: RouterState;
  explorer: ExplorerReducer.State;
  user: UserReducer.State;
  login: LoginReducer.State;
  shared: SharedReducer.State;
}

export const reducers = {
  router: routerReducer,
  explorer: ExplorerReducer.reducer,
  user: UserReducer.reducer,
  login: LoginReducer.reducer,
  shared: SharedReducer.reducer
};

// explorer
export function explorerPosts(state: State) {
  return state.explorer.posts;
}
export function explorerPostsLength(state: State): number {
  return state.explorer.posts.length;
}
export function explorerSearch(state: State): string {
  return state.explorer.search;
}

// user
export function userPosts(state: State) {
  return state.user.posts;
}
export function userPostsLength(state: State): number {
  return state.user.posts.length;
}
export function userPostSearchInfo(state: State): PostSearchInfo {
  return state.user.postSearchInfo;
}
export function userUser(state: State): User {
  return state.user.user;
}
export function userPost(state: State): Post {
  return state.user.post;
}

// login
export function loginUser(state: State): User {
  return state.login.user;
}
export function loginUserSecret(state: State): UserSecret {
  return state.login.userSecret;
}
export function existUserName(state: State): boolean {
  return state.login.existUserName;
}

// shared
export function sharedIsProgressBar(state: State): boolean {
  return state.shared.isProgressBar;
}
export function sharedIsProgressSpinner(state: State): boolean {
  return state.shared.isProgressSpinner;
}

