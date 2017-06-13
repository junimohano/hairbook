import * as UserReducer from '../users/shared/user-reducer';

export interface State {
  user: UserReducer.State;
}

export const reducers = {
  user: UserReducer.reducer
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
