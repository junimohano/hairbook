import * as Actions from './login-actions';
import { User } from 'app/shared/models/user';
import { UserSecret } from 'app/logins/shared/user-secret';

export interface State {
  userKey: string;
  user: User;
  userSecret: UserSecret;
  existUserName: boolean;
}

const initialState: State = {
  userKey: '',
  user: null,
  userSecret: null,
  existUserName: false
};

export function reducer(state = initialState, action: Actions.All): State {
  switch (action.type) {
    case Actions.EXIST_USER:
      return { ...state, userKey: action.payload };

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
