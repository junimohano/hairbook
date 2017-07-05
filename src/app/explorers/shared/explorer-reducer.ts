import * as Actions from './explorer-actions';
import { Post } from 'app/shared/models/post';

export interface State {
  search: string;
  posts: Post[];
  post: Post;
}

const initialState: State = {
  search: '',
  posts: [],
  post: null
};

export function reducer(state = initialState, action: Actions.All): State {
  switch (action.type) {
    case Actions.SEARCH_POST:
      console.log(`search_post : ${state.posts.length}`);
      if (state.search !== action.payload && action.payload !== null) {
        state.posts = [];
      }
      if (action.payload === null) {
        action.payload = state.search;
      }
      return { ...state, search: action.payload };

    case Actions.SUCCESS_POST:
      action.payload.forEach(x => x.currentUploadIndex = 0);
      state.posts = state.posts.concat(action.payload);

      state.posts.forEach(x => {
        if (x.postEvaluations.findIndex(postEvaluation => postEvaluation.createdUserId === +sessionStorage.getItem('userId')) !== -1) {
          x.isEvaluation = true;
        } else {
          x.isEvaluation = false;
        }
      });

      return { ...state };

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

    case Actions.ADD_POST_COMMENT_SUCCESS: {
      console.log(action.payload);
      const post = state.posts.find(x => x.postId === action.payload.postId);
      post.postComments.push(action.payload);
      post.totalPostComments++;
      return { ...state }
    }

    case Actions.DEL_POST_COMMENT_SUCCESS: {
      console.log(action.payload);
      const post = state.posts.find(x => x.postId === action.payload.postId);
      post.postComments = post.postComments.filter(x => x.postCommentId !== action.payload.postCommentId);
      post.totalPostComments--;
      return { ...state }
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
      return { ...state }
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
      return { ...state }
    }

    default:
      return state;
  }
}
