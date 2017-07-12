import * as PostReducer from '../posts/shared/post-reducer';
import * as UserReducer from '../users/shared/user-reducer';
import * as LoginReducer from '../logins/shared/login-reducer';
import * as SharedReducer from './shared-reducer';
import { User } from 'app/shared/models/user';
import { UserSecret } from 'app/logins/shared/user-secret';
import { routerReducer, RouterState } from '@ngrx/router-store';
import { PostSearchInfo } from 'app/shared/models/post-search-info';
import { Post } from 'app/shared/models/post';
import { PostComment } from 'app/shared/models/post-comment';
import { HairMenu } from 'app/shared/models/hair-menu';
import { HairType } from 'app/shared/models/hair-type';
import { Customer } from 'app/shared/models/customer';

export interface State {
  router: RouterState;
  post: PostReducer.State;
  user: UserReducer.State;
  login: LoginReducer.State;
  shared: SharedReducer.State;
}

export const reducers = {
  router: routerReducer,
  post: PostReducer.reducer,
  user: UserReducer.reducer,
  login: LoginReducer.reducer,
  shared: SharedReducer.reducer
};

// post
export function postHairMenus(state: State): HairMenu[] {
  return state.post.hairMenus;
}
export function postHairTypes(state: State): HairType[] {
  return state.post.hairTypes;
}
export function postCustomers(state: State): Customer[] {
  return state.post.customers;
}

// user
export function userUser(state: State): User {
  return state.user.user;
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

export function sharedPosts(state: State): Post[] {
  return state.shared.posts;
}
export function sharedPostsLength(state: State): number {
  return state.shared.posts.length;
}

export function sharedPostSearchInfo(state: State): PostSearchInfo {
  return state.shared.postSearchInfo;
}
export function sharedSelectedPost(state: State): Post {
  return state.shared.selectedPost;
}
