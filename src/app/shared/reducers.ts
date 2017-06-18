import * as ExplorerReducer from '../explorers/shared/explorer-reducer';
import * as UserReducer from '../users/shared/user-reducer';
import * as SharedReducer from './shared-reducer';
import { Post } from 'app/users/shared/models/post';

export interface State {
  explorer: ExplorerReducer.State;
  user: UserReducer.State;
  shared: SharedReducer.State;
}

export const reducers = {
  explorer: ExplorerReducer.reducer,
  user: UserReducer.reducer,
  shared: SharedReducer.reducer
};

export function selectPosts(state: State) {
  return state.user.posts;
}

export function selectCurrentPostCount(state: State): number {
  return state.user.posts.length;
}

export function selectPost(state: State): Post {
  return state.user.post;
}

export function selectUserId(state: State): number {
  return state.shared.userId;
}

export function selectAppProgress(state: State): boolean {
  return state.shared.isAppProgress;
}

export function selectCircleProgress(state: State): boolean {
  return state.shared.isCircleProgress;
}

export function selectExplorerPosts(state: State) {
  return state.explorer.posts;
}

export function selectCurrentExplorerPostCount(state: State): number {
  return state.explorer.posts.length;
}
