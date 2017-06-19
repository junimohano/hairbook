import * as ExplorerReducer from '../explorers/shared/explorer-reducer';
import * as UserReducer from '../users/shared/user-reducer';
import * as SharedReducer from './shared-reducer';

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

// user
export function userPosts(state: State) {
  return state.user.posts;
}

export function userPostsLength(state: State): number {
  return state.user.posts.length;
}

export function userSearch(state: State): string {
  return state.user.search;
}

// shared
export function sharedUserId(state: State): number {
  return state.shared.userId;
}

export function sharedIsProgressBar(state: State): boolean {
  return state.shared.isProgressBar;
}

export function sharedIsProgressSpinner(state: State): boolean {
  return state.shared.isProgressSpinner;
}

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
