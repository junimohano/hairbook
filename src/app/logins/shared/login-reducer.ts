import * as Actions from './login-actions';
import { User } from 'app/shared/models/user';
import { UserSecret } from 'app/logins/shared/user-secret';

export interface State {
  userKey: string;
  existUser: boolean;
  user: User;
  userSecret: UserSecret;
}

const initialState: State = {
  userKey: '',
  existUser: false,
  user: null,
  userSecret: null
};

export function reducer(state = initialState, action: Actions.All): State {
  switch (action.type) {
    case Actions.EXIST_USER:
      return { ...state, userKey: action.payload };

    case Actions.SUCCESS_EXIST_USER:
      return { ...state, existUser: action.payload };

    case Actions.GET_TOKEN:
      return { ...state, userSecret: action.payload };

    case Actions.SUCCESS_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
}
