import * as UserReducer from '../users/shared/user-reducer';
import * as SharedReducer from './shared-reducer';

export interface State {
  user: UserReducer.State;
  shared: SharedReducer.State;
}

export const reducers = {
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

export function selectUser(state: State): User {
  return state.shared.user;
}

export function selectAppProgress(state: State): boolean {
  return state.shared.isAppProgress;
}

