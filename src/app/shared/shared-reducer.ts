import * as Actions from './shared-actions';

export interface State {
  userId: number;
  userKey: string;
  isProgressBar: boolean;
  isProgressSpinner: boolean;
}

const initialState: State = {
  userId: 0,
  userKey: '',
  isProgressBar: false,
  isProgressSpinner: false
};

export function reducer(state = initialState, action: Actions.All): State {
  switch (action.type) {
    case Actions.GET_USER:
      return { ...state, userKey: action.payload };

    case Actions.SUCCESS_USER:
      return { ...state, userId: action.payload };

    case Actions.SET_PROGRESS_BAR:
      return { ...state, isProgressBar: action.payload }

    case Actions.SET_PROGRESS_SPINNER:
      return { ...state, isProgressSpinner: action.payload }

    default:
      return state;
  }
}
