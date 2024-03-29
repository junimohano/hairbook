import { PostSearchType } from './models/enums/post-search-type';
import { PostEvaluation } from './models/post-evaluation';
import { Post } from 'app/shared/models/post';
import { PostSearchInfo } from 'app/shared/models/post-search-info';

import * as Actions from './shared-actions';

export interface State {
  isProgressBar: boolean;
  isProgressSpinner: boolean;
  postSearchInfo: PostSearchInfo;
  posts: Post[];
  selectedPost: Post;
  isPreventRefreshingPosts: boolean;
  usersTabIndex: number;
  explorersTabIndex: number;
}

const initialState: State = {
  isProgressBar: false,
  isProgressSpinner: false,
  postSearchInfo: <PostSearchInfo>{
    postSearchType: PostSearchType.UsersCustomer
  },
  posts: [],
  selectedPost: null,
  isPreventRefreshingPosts: false,
  usersTabIndex: 0,
  explorersTabIndex: 1
};

export function reducer(state = initialState, action: Actions.All): State {

  switch (action.type) {
    case Actions.SET_PROGRESS_BAR: {
      return { ...state, isProgressBar: action.payload }
    }

    case Actions.SET_PROGRESS_SPINNER: {
      return { ...state, isProgressSpinner: action.payload }
    }

    case Actions.SEARCH_POSTS: {
      if (state.postSearchInfo) {
        if (state.postSearchInfo.search !== action.payload.search && action.payload !== null) {
          state.posts = [];
        }
        if (state.postSearchInfo.postSearchType !== action.payload.postSearchType) {
          state.posts = [];
          // search seperate between Users and modules of Explorers
          if (((state.postSearchInfo.postSearchType === PostSearchType.ExplorersAll || state.postSearchInfo.postSearchType === PostSearchType.ExplorersFollowingOnly) && (action.payload.postSearchType === PostSearchType.UsersCustomer || action.payload.postSearchType === PostSearchType.UsersTitle)) ||
            ((state.postSearchInfo.postSearchType === PostSearchType.UsersCustomer || state.postSearchInfo.postSearchType === PostSearchType.UsersTitle) && (action.payload.postSearchType === PostSearchType.ExplorersAll || action.payload.postSearchType === PostSearchType.ExplorersFollowingOnly))) {
            action.payload.search = '';
          }
          state.isPreventRefreshingPosts = false;
        }
      }
      const postSearchInfo = <PostSearchInfo>{
        search: action.payload.search,
        userNameParam: action.payload.userNameParam,
        postSearchType: action.payload.postSearchType
      }

      return { ...state, postSearchInfo: postSearchInfo };
    }

    case Actions.SUCCESS_POSTS: {
      console.log('success post');

      // remove duplicate
      state.posts = state.posts.concat(action.payload)
        .filter((post, index, self) => self.findIndex(x => x.postId === post.postId) === index);

      state.posts.forEach(post => {
        post.currentUploadIndex = 0;
        post.postMenuColor = post.postHairMenus.find(x => x.hairMenuId === 2);
        post.postMenuPerm = post.postHairMenus.find(x => x.hairMenuId === 3);
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
      action.payload.postMenuColor = action.payload.postHairMenus.find(x => x.hairMenuId === 2);
      action.payload.postMenuPerm = action.payload.postHairMenus.find(x => x.hairMenuId === 3);

      const postIndex = state.posts.findIndex(x => x.postId === action.payload.postId);
      // add Post
      if (postIndex === -1) {
        state.posts.splice(0, 0, action.payload);
      } else {
        // replace
        state.posts[postIndex] = action.payload;
      }

      console.log(Actions.GET_POST_SUCCESS, action.payload);

      return { ...state, selectedPost: action.payload };
    }

    case Actions.ADD_POST_COMMENT_SUCCESS: {
      console.log(action.payload);
      const post = state.posts.find(x => x.postId === action.payload.postId);
      post.postComments.push(action.payload);
      post.totalPostComments++;
      return { ...state, selectedPost: post };
    }

    case Actions.DEL_POST_COMMENT_SUCCESS: {
      console.log(action.payload);
      const post = state.posts.find(x => x.postId === action.payload.postId);
      post.postComments = post.postComments.filter(x => x.postCommentId !== action.payload.postCommentId);
      post.totalPostComments--;
      return { ...state, selectedPost: post };
    }

    case Actions.ADD_POST_EVALUATION_SUCCESS: {
      console.log(action.payload);
      const post = state.posts.find(x => x.postId === action.payload.postId);
      post.isEvaluation = true;
      post.totalPostEvaluations++;
      return { ...state, selectedPost: post };
    }

    case Actions.DEL_POST_EVALUATION_SUCCESS: {
      console.log(action.payload);
      const post = state.posts.find(x => x.postId === action.payload.postId);
      post.isEvaluation = false;
      post.totalPostEvaluations--;
      return { ...state, selectedPost: post };
    }

    case Actions.ADD_POST_FAVORITE_SUCCESS: {
      console.log(action.payload);
      const post = state.posts.find(x => x.postId === action.payload.postId);
      post.isFavorite = true;
      return { ...state, selectedPost: post };
    }

    case Actions.DEL_POST_FAVORITE_SUCCESS: {
      console.log(action.payload);
      const post = state.posts.find(x => x.postId === action.payload.postId);
      post.isFavorite = false;
      return { ...state, selectedPost: post };
    }

    case Actions.GET_POST_COMMENT_SUCCESS: {
      const post = state.posts.find(x => x.postId === action.payload.postId);
      post.postComments = action.payload.postComments.concat(post.postComments)
        .filter((postComment, index, self) => self.findIndex(x => x.postCommentId === postComment.postCommentId) === index)

      return { ...state, selectedPost: post };
    }

    case Actions.DEL_POST_SUCCESS: {
      return { ...state, posts: state.posts.filter(x => x.postId !== action.payload) };
    }

    case Actions.SET_IS_PREVENT_REFRESHING_POSTS:
      return { ...state, isPreventRefreshingPosts: action.payload };

    case Actions.SET_USERS_TAB_INDEX:
      return { ...state, usersTabIndex: action.payload };

    case Actions.SET_EXPLORERS_TAB_INDEX:
      return { ...state, explorersTabIndex: action.payload };

    default:
      return state;
  }
}

function setValidatePost(post: Post) {
  const userId = +sessionStorage.getItem('userId');

  if (post.postEvaluations.findIndex(postEvaluation => postEvaluation.createdUserId === userId) !== -1) {
    post.isEvaluation = true;
  } else {
    post.isEvaluation = false;
  }

  if (post.postFavorites.findIndex(postFavorite => postFavorite.createdUserId === userId) !== -1) {
    post.isFavorite = true;
  } else {
    post.isFavorite = false;
  }
}

