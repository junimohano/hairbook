import * as Actions from './shared-actions';

export interface State {
  user: User;
  userKey: string;
  isAppProgress: boolean;
}

const initialState: State = {
  user: null,
  userKey: '',
  isAppProgress: true
};

export function reducer(state = initialState, action: Actions.All): State {
  switch (action.type) {
    case Actions.GET_USER:
      return { ...state, userKey: action.payload };

    case Actions.SUCCESST_USER:
      return { ...state, user: action.payload };

    case Actions.SET_PROGRESS:
      return {...state, isAppProgress: action.payload }

    default:
      return state;
  }
}
