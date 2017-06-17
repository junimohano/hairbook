import * as Actions from './shared-actions';

export interface State {
  userId: number;
  userKey: string;
  isAppProgress: boolean;
  isCircleProgress: boolean;
}

const initialState: State = {
  userId: 0,
  userKey: '',
  isAppProgress: false,
  isCircleProgress: false
};

export function reducer(state = initialState, action: Actions.All): State {
  switch (action.type) {
    case Actions.GET_USER:
      return { ...state, userKey: action.payload };

    case Actions.SUCCESS_USER:
      return { ...state, userId: action.payload };

    case Actions.SET_PROGRESS:
      return { ...state, isAppProgress: action.payload }

    case Actions.SET_CIRCLE_PROGRESS:
      return { ...state, isCircleProgress: action.payload }

    default:
      return state;
  }
}
