import { FriendSearchType } from './friend-search-type';
import { UserFriend } from '../../shared/models/user-friend';
import { UserSecret } from 'app/logins/shared/user-secret';
import { User } from 'app/shared/models/user';

import * as Actions from './friend-actions';
import { FriendSearchInfo } from 'app/friends/shared/friend-search-info';

export interface State {
  friendSearchInfo: FriendSearchInfo;
  userFriends: UserFriend[];
  users: User[];
}

const initialState: State = {
  friendSearchInfo: <FriendSearchInfo>{
    friendSearchType: FriendSearchType.Following,
    search: ''
  },
  userFriends: [],
  users: []
};

export function reducer(state = initialState, action: Actions.All): State {
  switch (action.type) {

    case Actions.SEARCH_FRIENDS:
      if (state.friendSearchInfo) {
        if (state.friendSearchInfo.search !== action.payload.search && action.payload !== null) {
          if (action.payload.friendSearchType === FriendSearchType.Search) {
            state.users = [];
          } else {
            state.userFriends = [];
          }
        }
        if (state.friendSearchInfo.friendSearchType !== action.payload.friendSearchType) {
          if (action.payload.friendSearchType === FriendSearchType.Search) {
            state.users = [];
          } else {
            state.userFriends = [];
          }
        }
      }
      state.friendSearchInfo = <FriendSearchInfo>{
        search: action.payload.search,
        friendSearchType: action.payload.friendSearchType
      };
      return { ...state };

    case Actions.SEARCH_FRIENDS_FOLLOWING_AND_FOLLOWERS_SUCCESS:

      // remove duplicate
      state.userFriends = state.userFriends.concat(action.payload)
        .filter((userFriend, index, self) => self.findIndex(x => x.userFriendId === userFriend.userFriendId) === index);

      console.log(`Search Following and Followers : ${state.userFriends.length}`);

      return { ...state, userFriends: state.userFriends };

    case Actions.SEARCH_FRIENDS_SEARCH_SUCCESS:

      state.users = state.users.concat(action.payload)
        .filter((user, index, self) => self.findIndex(x => x.userId === user.userId) === index);

      console.log(`Search : ${state.users.length}`);

      return { ...state, users: state.users };

    default:
      return state;
  }
}
