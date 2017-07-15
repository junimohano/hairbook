import * as Actions from './shared-actions';
import { User } from 'app/shared/models/user';
import { PostSearchInfo } from 'app/shared/models/post-search-info';
import { Post } from 'app/shared/models/post';

export interface State {
  isProgressBar: boolean;
  isProgressSpinner: boolean;
  postSearchInfo: PostSearchInfo;
  posts: Post[];
  selectedPost: Post;
}

const initialState: State = {
  isProgressBar: false,
  isProgressSpinner: false,
  postSearchInfo: <PostSearchInfo>{
    isUserPost: true
  },
  posts: [],
  selectedPost: null
};

export function reducer(state = initialState, action: Actions.All): State {

  switch (action.type) {
    case Actions.SET_PROGRESS_BAR: {
      return { ...state, isProgressBar: action.payload }
    }

    case Actions.SET_PROGRESS_SPINNER: {
      return { ...state, isProgressSpinner: action.payload }
    }

    case Actions.SEARCH_POST: {
      if (state.postSearchInfo) {
        if (state.postSearchInfo.search !== action.payload.search && action.payload !== null) {
          state.posts = [];
        }
        if (state.postSearchInfo.isUserPost !== action.payload.isUserPost) {
          state.posts = [];
        }
        if (action.payload === null) {
          action.payload.search = state.postSearchInfo.search;
        }
      }
      state.postSearchInfo = <PostSearchInfo>{
        search: action.payload.search,
        userNameParam: action.payload.userNameParam,
        isUserPost: action.payload.isUserPost
      }

      return { ...state };
    }

    case Actions.SUCCESS_POST: {
      console.log('success post');

      action.payload.forEach(x => x.currentUploadIndex = 0);
      state.posts = state.posts.concat(action.payload)
        .filter((post, index, self) => self.findIndex(x => x.postId === post.postId) === index)

      state.posts.forEach(x => {
        if (x.postEvaluations.findIndex(postEvaluation => postEvaluation.createdUserId === +sessionStorage.getItem('userId')) !== -1) {
          x.isEvaluation = true;
        } else {
          x.isEvaluation = false;
        }
      });

      console.log(`search_post : ${state.posts.length}`);

      return { ...state, posts: state.posts };
    }

    case Actions.PREVIOUS_UPLOAD_INDEX: {
      const post = state.posts.find(x => x.postId === action.payload);

      if (post.currentUploadIndex > 0) {
        post.currentUploadIndex--;
      }
      return { ...state };
    }

    case Actions.NEXT_UPLOAD_INDEX: {
      const post = state.posts.find(x => x.postId === action.payload);
      if (post.currentUploadIndex < post.postUploads.length - 1) {
        post.currentUploadIndex++;
      }
      return { ...state };
    }

    case Actions.RESET_STATE: {
      return initialState;
    }

    case Actions.GET_POST_SUCCESS: {
      action.payload.currentUploadIndex = 0;
      if (action.payload.postEvaluations.findIndex(postEvaluation => postEvaluation.createdUserId === +sessionStorage.getItem('userId')) !== -1) {
        action.payload.isEvaluation = true;
      } else {
        action.payload.isEvaluation = false;
      }
      return { ...state, selectedPost: action.payload };
    }

    case Actions.ADD_POST_COMMENT_SUCCESS: {
      console.log(action.payload);
      const post = state.posts.find(x => x.postId === action.payload.postId);
      post.postComments.push(action.payload);
      post.totalPostComments++;
      return { ...state, selectedPost: post }
    }

    case Actions.DEL_POST_COMMENT_SUCCESS: {
      console.log(action.payload);
      const post = state.posts.find(x => x.postId === action.payload.postId);
      post.postComments = post.postComments.filter(x => x.postCommentId !== action.payload.postCommentId);
      post.totalPostComments--;
      return { ...state, selectedPost: post }
    }

    case Actions.ADD_POST_EVALUATION_SUCCESS: {
      console.log(action.payload);
      const post = state.posts.find(x => x.postId === action.payload.postId);
      post.postEvaluations.push(action.payload);
      if (post.postEvaluations.findIndex(postEvaluation => postEvaluation.createdUserId === +sessionStorage.getItem('userId')) !== -1) {
        post.isEvaluation = true;
      } else {
        post.isEvaluation = false;
      }
      return { ...state, selectedPost: post }
    }

    case Actions.DEL_POST_EVALUATION_SUCCESS: {
      console.log(action.payload);
      const post = state.posts.find(x => x.postId === action.payload.postId);
      post.postEvaluations = post.postEvaluations.filter(x => x.postEvaluationId !== action.payload.postEvaluationId);
      if (post.postEvaluations.findIndex(postEvaluation => postEvaluation.createdUserId === +sessionStorage.getItem('userId')) !== -1) {
        post.isEvaluation = true;
      } else {
        post.isEvaluation = false;
      }
      return { ...state, selectedPost: post }
    }

    case Actions.GET_POST_COMMENT_SUCCESS: {
      const post = state.posts.find(x => x.postId === action.payload.postId);
      post.postComments = action.payload.postComments.concat(post.postComments)
        .filter((postComment, index, self) => self.findIndex(x => x.postCommentId === postComment.postCommentId) === index)

      return { ...state, selectedPost: post }
    }

    case Actions.DEL_POST_SUCCESS: {
      return { ...state, posts: state.posts.filter(x => x.postId !== action.payload) }
    }


    default:
      return state;
  }
}

