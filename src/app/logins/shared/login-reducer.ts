import { SocialUser } from 'angular4-social-login/dist';
import { UserSecret } from 'app/logins/shared/user-secret';
import { User } from 'app/shared/models/user';

import * as Actions from './login-actions';

export interface State {
  socialUser: SocialUser;
  user: User;
  userSecret: UserSecret;
  existUserName: boolean;
}

const initialState: State = {
  socialUser: null,
  user: null,
  userSecret: null,
  existUserName: false
};

export function reducer(state = initialState, action: Actions.All): State {
  switch (action.type) {
    case Actions.EXIST_USER:
      return { ...state, socialUser: action.payload };

    case Actions.GET_TOKEN:
      return { ...state, userSecret: action.payload };

    case Actions.SET_USER:
      return { ...state, user: action.payload };

    case Actions.EXIST_USER_NAME_SUCCESS:
      return { ...state, existUserName: action.payload }

    default:
      return state;
  }
}
