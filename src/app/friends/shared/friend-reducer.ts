import { FriendSearchType } from './friend-search-type';
import { UserFriend } from '../../shared/models/user-friend';
import { SocialUser } from 'angular4-social-login/dist';
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
    friendSearchType: FriendSearchType.Search
  },
  userFriends: []
};

export function reducer(state = initialState, action: Actions.All): State {
  switch (action.type) {

    case Actions.SEARCH_FRIENDS:
      return { ...state, friendSearchInfo: action.payload };

    case Actions.SEARCH_FRIENDS_SUCCESS:
      return { ...state, userFriends: action.payload };

    default:
      return state;
  }
}
