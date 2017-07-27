import { FriendSearchType } from './friend-search-type';
import { UserFriend } from '../../shared/models/user-friend';
import { UserSecret } from 'app/logins/shared/user-secret';
import { User } from 'app/shared/models/user';

import * as Actions from './friend-actions';
import { FriendSearchInfo } from 'app/friends/shared/friend-search-info';

export interface State {
  friendSearchInfo: FriendSearchInfo;
  userFriends: UserFriend[];
}

const initialState: State = {
  friendSearchInfo: <FriendSearchInfo>{
    friendSearchType: FriendSearchType.Following,
    search: ''
  },
  userFriends: []
};

export function reducer(state = initialState, action: Actions.All): State {
  switch (action.type) {

    case Actions.SEARCH_FRIENDS:
      if (state.friendSearchInfo) {
        if (state.friendSearchInfo.search !== action.payload.search && action.payload !== null) {
          state.userFriends = [];
        }
        if (state.friendSearchInfo.friendSearchType !== action.payload.friendSearchType) {
          state.userFriends = [];
        }
        if (action.payload === null) {
          action.payload.search = state.friendSearchInfo.search;
        }
      }
      state.friendSearchInfo = <FriendSearchInfo>{
        search: action.payload.search,
        friendSearchType: action.payload.friendSearchType
      };
      return { ...state };

    case Actions.SEARCH_FRIENDS_SUCCESS:
      return { ...state, userFriends: action.payload };

    default:
      return state;
  }
}
