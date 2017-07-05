import * as Actions from './user-actions';
import { Post } from 'app/shared/models/post';
import { User } from 'app/shared/models/user';
import { PostSearchInfo } from 'app/shared/models/post-search-info';
import { PostComment } from 'app/shared/models/post-comment';

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
