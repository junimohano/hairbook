import * as Actions from './user-actions';

export interface State {
  currentPostCount: number;
  posts: Post[];
  post: Post;
  isLast: boolean;
}

const initialState: State = {
  currentPostCount: 0,
  posts: [],
  post: null,
  isLast: false
};

export function reducer(state = initialState, action: Actions.All): State {
  switch (action.type) {
    case Actions.SEARCH_POST:
      console.log(`search_post : ${state.posts.length}`);
      return { ...state, currentPostCount: state.posts.length };

    case Actions.SUCCESS_POST:
      let isLast = false;
      if (state.currentPostCount === state.posts.length) {
        isLast = true;
      }

      action.payload.forEach(x => x.currentUploadIndex = 0);

      return { ...state, posts: action.payload, isLast: isLast };

    case Actions.PREVIOUS_UPLOAD_INDEX:
      {
        const post = state.posts.find(x => x.postId === action.payload );

        if (post.currentUploadIndex > 0) {
          post.currentUploadIndex--;
        }
        return { ...state };
      }
    case Actions.NEXT_UPLOAD_INDEX:
      {
        const post = state.posts.find(x => x.postId === action.payload );
        if (post.currentUploadIndex < post.postUploads.length - 1) {
          post.currentUploadIndex++;
        }
        return { ...state };
      }

       case Actions.GET_POST:
      {
        const post = state.posts.find(x => x.postId === action.payload );
        return { ...state, post: post };
      }

    default:
      return state;
  }
}
