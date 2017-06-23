import * as Actions from './shared-actions';
import { User } from 'app/shared/models/user';

export interface State {
  isProgressBar: boolean;
  isProgressSpinner: boolean;
}

const initialState: State = {
  isProgressBar: false,
  isProgressSpinner: false
};

export function reducer(state = initialState, action: Actions.All): State {
  switch (action.type) {
    case Actions.SET_PROGRESS_BAR:
      return { ...state, isProgressBar: action.payload }

    case Actions.SET_PROGRESS_SPINNER:
      return { ...state, isProgressSpinner: action.payload }

    default:
      return state;
  }
}
