import * as Actions from './shared-actions';
import { User } from 'app/shared/models/user';
import { PostSearchInfo } from 'app/shared/models/post-search-info';
import { Post } from 'app/shared/models/post';
import { PostComment } from 'app/shared/models/post-comment';

export interface State {
  isProgressBar: boolean;
  isProgressSpinner: boolean;
  postSearchInfo: PostSearchInfo;
  userPosts: Post[];
  explorerPosts: Post[];
  selectedPost: Post;
  postComment: PostComment;
}

const initialState: State = {
  isProgressBar: false,
  isProgressSpinner: false,
  postSearchInfo: <PostSearchInfo>{
    isUserPost: true
  },
  userPosts: [],
  explorerPosts: [],
  selectedPost: null,
  postComment: null
};

function getPosts(state): Post[] {
  return state.postSearchInfo.isUserPost ? state.userPosts : state.explorerPosts;
}

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
          if (state.postSearchInfo.isUserPost) {
            state.userPosts = [];
          } else {
            state.explorerPosts = [];
          }
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
      let posts = getPosts(state);
      console.log('success post');

      action.payload.forEach(x => x.currentUploadIndex = 0);
      posts = posts.concat(action.payload);

      posts.forEach(x => {
        if (x.postEvaluations.findIndex(postEvaluation => postEvaluation.createdUserId === +sessionStorage.getItem('userId')) !== -1) {
          x.isEvaluation = true;
        } else {
          x.isEvaluation = false;
        }
      });

      console.log(`search_post : ${posts.length}`);

      if (state.postSearchInfo.isUserPost) {
        return { ...state, userPosts: posts };
      } else {
        return { ...state, explorerPosts: posts };
      }
    }

    case Actions.PREVIOUS_UPLOAD_INDEX: {
      const post = getPosts(state).find(x => x.postId === action.payload);

      if (post.currentUploadIndex > 0) {
        post.currentUploadIndex--;
      }
      return { ...state };
    }

    case Actions.NEXT_UPLOAD_INDEX: {
      const post = getPosts(state).find(x => x.postId === action.payload);
      if (post.currentUploadIndex < post.postUploads.length - 1) {
        post.currentUploadIndex++;
      }
      return { ...state };
    }

    case Actions.RESET_STATE: {
      return initialState;
    }

    case Actions.GET_POST_SUCCESS: {
      return { ...state, selectedPost: action.payload };
    }

    case Actions.ADD_POST_COMMENT_SUCCESS: {
      console.log(action.payload);
      const post = getPosts(state).find(x => x.postId === action.payload.postId);
      post.postComments.push(action.payload);
      post.totalPostComments++;
      return { ...state }
    }

    case Actions.DEL_POST_COMMENT_SUCCESS: {
      console.log(action.payload);
      const post = getPosts(state).find(x => x.postId === action.payload.postId);
      post.postComments = post.postComments.filter(x => x.postCommentId !== action.payload.postCommentId);
      post.totalPostComments--;
      return { ...state }
    }

    case Actions.ADD_POST_EVALUATION_SUCCESS: {
      console.log(action.payload);
      const post = getPosts(state).find(x => x.postId === action.payload.postId);
      post.postEvaluations.push(action.payload);
      if (post.postEvaluations.findIndex(postEvaluation => postEvaluation.createdUserId === +sessionStorage.getItem('userId')) !== -1) {
        post.isEvaluation = true;
      } else {
        post.isEvaluation = false;
      }
      return { ...state }
    }

    case Actions.DEL_POST_EVALUATION_SUCCESS: {
      console.log(action.payload);
      const post = getPosts(state).find(x => x.postId === action.payload.postId);
      post.postEvaluations = post.postEvaluations.filter(x => x.postEvaluationId !== action.payload.postEvaluationId);
      if (post.postEvaluations.findIndex(postEvaluation => postEvaluation.createdUserId === +sessionStorage.getItem('userId')) !== -1) {
        post.isEvaluation = true;
      } else {
        post.isEvaluation = false;
      }
      return { ...state }
    }

    default:
      return state;
  }
}
