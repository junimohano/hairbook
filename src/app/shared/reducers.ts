import * as PostReducer from '../posts/shared/post-reducer';

export interface State {
  post: PostReducer.State;
}

export const reducers = {
  post: PostReducer.reducer
};

export function selectPosts(state: State) {
  return state.post.posts;
}

export function selectCurrentIndex(state: State): number {
  return state.post.posts.length;
}
