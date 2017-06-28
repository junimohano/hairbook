import * as Actions from './user-actions';
import { Post } from 'app/shared/models/post';
import { User } from 'app/shared/models/user';
import { PostSearchInfo } from 'app/shared/models/post-search-info';

export interface State {
  postSearchInfo: PostSearchInfo;
  currentPostCount: number;
  posts: Post[];
  isLast: boolean;
  user: User;
  post: Post;
}

const initialState: State = {
  postSearchInfo: null,
  currentPostCount: 0,
  posts: [],
  isLast: false,
  user: null,
  post: null
};

export function reducer(state = initialState, action: Actions.All): State {
  switch (action.type) {
    case Actions.SEARCH_POST:
      console.log(`search_post : ${state.posts.length}`);

      if (state.postSearchInfo) {
        if (state.postSearchInfo.search !== action.payload.search && action.payload !== null) {
          state.posts = []
        }
        if (action.payload === null) {
          action.payload.search = state.postSearchInfo.search;
        }
      }

      state.postSearchInfo = <PostSearchInfo>{
        search: action.payload.search,
        userNameParam: action.payload.userNameParam
      }

      return { ...state, currentPostCount: state.posts.length };

    case Actions.SUCCESS_POST:
      let isLast = false;
      if (state.currentPostCount === state.posts.length) {
        isLast = false;
      }

      action.payload.forEach(x => x.currentUploadIndex = 0);
      state.posts = state.posts.concat(action.payload);
      return { ...state, isLast: isLast };

    case Actions.PREVIOUS_UPLOAD_INDEX:
      {
        const post = state.posts.find(x => x.postId === action.payload);

        if (post.currentUploadIndex > 0) {
          post.currentUploadIndex--;
        }
        return { ...state };
      }

    case Actions.NEXT_UPLOAD_INDEX:
      {
        const post = state.posts.find(x => x.postId === action.payload);
        if (post.currentUploadIndex < post.postUploads.length - 1) {
          post.currentUploadIndex++;
        }
        return { ...state };
      }

    case Actions.RESET_STATE:
      return initialState;

    case Actions.GET_USER_SUCCESS:
      return { ...state, user: action.payload };

    case Actions.GET_POST_SUCCESS:
      return { ...state, post: action.payload };

    default:
      return state;
  }
}
