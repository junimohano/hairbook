import { User } from 'app/shared/models/user';

import * as Actions from './user-actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export function reducer(state = initialState, action: Actions.All): State {
  switch (action.type) {

    case Actions.GET_USER_SUCCESS:
      return { ...state, user: action.payload };

    case Actions.ADD_USER_FRIEND_SUCCESS: {
      console.log(action.payload);
      state.user.isFollowing = true;
      return { ...state };
    }

    case Actions.DEL_USER_FRIEND_SUCCESS: {
      console.log(action.payload);
      state.user.isFollowing = false;
      return { ...state };
    }

    default:
      return state;
  }
}
