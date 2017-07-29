import * as fromRouter from '@ngrx/router-store';
import { SocialUser } from 'angular4-social-login/dist';
import { UserSecret } from 'app/logins/shared/user-secret';
import { Customer } from 'app/shared/models/customer';
import { HairMenu } from 'app/shared/models/hair-menu';
import { HairType } from 'app/shared/models/hair-type';
import { Post } from 'app/shared/models/post';
import { PostSearchInfo } from 'app/shared/models/post-search-info';
import { User } from 'app/shared/models/user';

import * as FriendReducer from '../friends/shared/friend-reducer';
import { FriendSearchInfo } from '../friends/shared/friend-search-info';
import * as LoginReducer from '../logins/shared/login-reducer';
import * as PostReducer from '../posts/shared/post-reducer';
import * as UserReducer from '../users/shared/user-reducer';
import { PostSearchType } from './models/enums/post-search-type';
import { UserFriend } from './models/user-friend';
import * as SharedReducer from './shared-reducer';

export interface State {
  router: fromRouter.RouterReducerState;
  post: PostReducer.State;
  user: UserReducer.State;
  login: LoginReducer.State;
  shared: SharedReducer.State;
  friend: FriendReducer.State;
}

export const reducers = {
  router: fromRouter.routerReducer,
  post: PostReducer.reducer,
  user: UserReducer.reducer,
  login: LoginReducer.reducer,
  shared: SharedReducer.reducer,
  friend: FriendReducer.reducer,
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
export function loginSocialUser(state: State): SocialUser {
  return state.login.socialUser;
}
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
export function sharedUsersTabIndex(state: State): number {
  return state.shared.usersTabIndex;
}
export function sharedExplorersTabIndex(state: State): number {
  return state.shared.explorersTabIndex;
}
export function sharedPostSearchType(state: State): PostSearchType {
  return state.shared.postSearchInfo.postSearchType;
}

// friend
export function friendUserFriends(state: State): UserFriend[] {
  return state.friend.userFriends;
}

export function friendFriendSearchInfo(state: State): FriendSearchInfo {
  return state.friend.friendSearchInfo;
}
