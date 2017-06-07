import * as Actions from './post-actions';

export interface State {
  currentIndex: number;
  posts: Post[];
  isLast: boolean;
}

const initialState: State = {
  currentIndex: 0,
  posts: [],
  isLast: false
};

export function reducer(state = initialState, action: Actions.All): State {
  switch (action.type) {
    case Actions.SEARCH_POST:
      console.log(`search_post : ${state.posts.length}`);
      return { ...state, currentIndex: state.posts.length };

    case Actions.SUCCESS_POST:
      let isLast = false;
      if (state.currentIndex === state.posts.length) {
        isLast = true;
      }
      return { ...state, posts: action.payload, isLast: isLast };

    default:
      return state;
  }
}
