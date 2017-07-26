import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Auth } from 'app/shared/auth/auth.service';
import { AccessType } from 'app/shared/models/enums/access-type';
import { Post } from 'app/shared/models/post';
import { PostComment } from 'app/shared/models/post-comment';
import { PostCommentInfo } from 'app/shared/models/post-comment-info';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { SharedService } from 'app/shared/shared.service';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Rx';

import * as Reducers from './reducers';
import * as SharedActions from './shared-actions';

@Injectable()
export class SharedEffects {

  @Effect() setSnackBarEffect$ = this.actions$.ofType(SharedActions.SET_SNACK_BAR)
    .map((action: SharedActions.SetSnackBar) => {
      this.snackBar.open(action.payload.statusText, 'close', {
        duration: 5000,
      })
      console.log(action.payload);
      if (action.payload.status === 401) {
        this.store.dispatch(new SharedActions.SetProgressBar(false));
        return new SharedActions.NavLogin();
      } else {
        return new SharedActions.SetProgressBar(false);
      }
    });

  @Effect() navExplorersEffect$ = this.actions$.ofType(SharedActions.NAV_EXPLORERS)
    .map((action: SharedActions.NavExplorers) => {
      this.router.navigate(['/explorers']);
      return new SharedActions.NoAction();
    });

  @Effect() navExplorersPostEffect$ = this.actions$.ofType(SharedActions.NAV_EXPLORERS_POST)
    .map((action: SharedActions.NavExplorersPost) => {
      this.router.navigate(['/explorers', 'post', action.payload]);
      return new SharedActions.NoAction();
    });

  @Effect() navLoginEffect$ = this.actions$.ofType(SharedActions.NAV_LOGIN)
    .map((action: SharedActions.NavLogin) => {
      this.router.navigate(['/login']);
      return new SharedActions.NoAction();
    });

  @Effect() navLoginRegisterEffect$ = this.actions$.ofType(SharedActions.NAV_LOGIN_REGISTER)
    .map((action: SharedActions.NavLoginRegister) => {
      this.router.navigate(['/login', 'register']);
      return new SharedActions.NoAction();
    });

  @Effect() navUsersEffect$ = this.actions$.ofType(SharedActions.NAV_USERS)
    .map((action: SharedActions.NavUsers) => {
      console.log(SharedActions.NAV_USERS);
      this.router.navigate(['/users', action.payload]);
      return new SharedActions.NoAction();
    });

  @Effect() navUsersPostEffect$ = this.actions$.ofType(SharedActions.NAV_USERS_POST)
    .map((action: SharedActions.NavUsersPost) => {
      this.router.navigate(['/users', 'post', action.payload]);
      return new SharedActions.NoAction();
    });

  @Effect() navPostEffect$ = this.actions$.ofType(SharedActions.NAV_POSTS)
    .map((action: SharedActions.NavPosts) => {
      this.router.navigate(['/posts', action.payload]);
      return new SharedActions.NoAction();
    });

  @Effect() searchUserPostEffect$ = this.actions$.ofType(SharedActions.SEARCH_POSTS)
    .debounceTime(100)
    // .filter(x => !x)
    // .filter(() => this.auth.userId !== undefined)
    .withLatestFrom(this.store, (payload, state) => {
      const totalPosts = state.shared.posts.length;
      if (totalPosts === 0) {
        this.store.dispatch(new SharedActions.SetProgressBar(true));
      } else {
        this.store.dispatch(new SharedActions.SetProgressSpinner(true));
      }
      return ({ currentTotalPosts: totalPosts, postSearchInfo: state.shared.postSearchInfo })
    })
    .switchMap((results) => {
      let getPostsObservable: Observable<Post[]>;

      // users page
      if (results.postSearchInfo.isUserPost) {
        getPostsObservable = this.sharedService.getPosts(results.currentTotalPosts, AccessType.Private, String(this.auth.userName), results.postSearchInfo.userNameParam, results.postSearchInfo.search)

        // explorer page
      } else {
        getPostsObservable = this.sharedService.getPosts(results.currentTotalPosts, AccessType.Public, '', '', results.postSearchInfo.search);
      }

      return getPostsObservable
        .map((posts: Post[]) => {
          this.store.dispatch(new SharedActions.SetProgressBar(false));
          this.store.dispatch(new SharedActions.SetProgressSpinner(false));
          return new SharedActions.SuccessPosts(posts);
        })
        .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    });

  @Effect() getPostEffect$ = this.actions$.ofType(SharedActions.GET_POST)
    .map((action: SharedActions.GetPost) => action.payload)
    .switchMap((postId: number) => {
      this.store.dispatch(new SharedActions.SetProgressBar(true));

      return this.sharedService.getPost(postId)
        .map((post: Post) => {
          this.store.dispatch(new SharedActions.SetProgressBar(false));
          return new SharedActions.GetPostSuccess(post);
        })
        .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    });

  @Effect() addPostCommentEffect$ = this.actions$.ofType(SharedActions.ADD_POST_COMMENT)
    .map((action: SharedActions.AddPostComment) => action.payload)
    .switchMap((postComment: PostComment) => this.sharedService.addPostComment(postComment)
      .map((result: PostComment) => new SharedActions.AddPostCommentSuccess(result))
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() delPostCommentEffect$ = this.actions$.ofType(SharedActions.DEL_POST_COMMENT)
    .map((action: SharedActions.DelPostComment) => action.payload)
    .switchMap((postCommentId: number) => this.sharedService.delPostComment(postCommentId)
      .map((result: PostComment) => new SharedActions.DelPostCommentSuccess(result))
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() addPostEvaluationEffect$ = this.actions$.ofType(SharedActions.ADD_POST_EVALUATION)
    .map((action: SharedActions.AddPostEvaluation) => action.payload)
    .switchMap((postEvaluation: PostEvaluation) => this.sharedService.addPostEvaluation(postEvaluation)
      .map((result: PostEvaluation) => new SharedActions.AddPostEvaluationSuccess(result))
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() delPostEvaluationEffect$ = this.actions$.ofType(SharedActions.DEL_POST_EVALUATION)
    .map((action: SharedActions.DelPostEvaluation) => action.payload)
    .switchMap((postEvaluationId: number) => this.sharedService.delPostEvaluation(postEvaluationId)
      .map((result: PostEvaluation) => new SharedActions.DelPostEvaluationSuccess(result))
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() getPostCommentEffect$ = this.actions$.ofType(SharedActions.GET_POST_COMMENT)
    .map((action: SharedActions.GetPostComment) => action.payload)
    .switchMap((post: Post) => this.sharedService.getPostComments(post.postComments.length, post.postId)
      .map((result: PostComment[]) => {
        const postCommentInfo = <PostCommentInfo>{
          postId: post.postId,
          postComments: result
        }
        return new SharedActions.GetPostCommentSuccess(postCommentInfo)
      })
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() delPostEffect$ = this.actions$.ofType(SharedActions.DEL_POST)
    .map((action: SharedActions.DelPost) => action.payload)
    .switchMap((postId: number) => this.sharedService.delPost(postId)
      .map(x => new SharedActions.DelPostSuccess(x.postId))
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res))));
  // location.reload()

  constructor(private actions$: Actions,
    private store: Store<Reducers.State>,
    private auth: Auth,
    private snackBar: MdSnackBar,
    private sharedService: SharedService,
    private router: Router) {

  }
}
