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

    default:
      return state;
  }
}
