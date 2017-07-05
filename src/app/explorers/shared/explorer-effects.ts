import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom'
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';

import { ExplorerService } from './explorer.service';
import * as ExplorerActions from './explorer-actions';
import * as SharedActions from '../../shared/shared-actions';
import * as Reducers from '../../shared/reducers';
import { AccessType } from 'app/shared/models/enums/access-type';
import { Post } from 'app/shared/models/post';
import { of } from 'rxjs/observable/of';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { PostComment } from 'app/shared/models/post-comment';
import { SharedService } from 'app/shared/shared.service';

@Injectable()
export class ExplorerEffects {

  @Effect() specialEffect$ = this.actions$.ofType(ExplorerActions.SEARCH_POST)
    .debounceTime(100)
    // .withLatestFrom(this.store, (payload, state) => {
    //   if (state.explorer.posts.length === 0) {
    //     this.store.dispatch(new SharedActions.SetProgressBar(true));
    //   }
    //   this.store.dispatch(new SharedActions.SetProgressSpinner(true));
    //   return state.explorer.isLast;
    // })
    // .filter(x => !x)
    // .filter(() => sessionStorage.getItem('userId') !== undefined)
    .withLatestFrom(this.store, (payload, state) => {
      if (state.explorer.posts.length === 0) {
        this.store.dispatch(new SharedActions.SetProgressBar(true));
      }
      this.store.dispatch(new SharedActions.SetProgressSpinner(true));
      return ({ currentPostCount: state.explorer.posts.length, search: state.explorer.search })
    })
    .switchMap((results) => this.sharedService.getPosts(results.currentPostCount, AccessType.Public, '', '', results.search))
    .map(results => {
      this.store.dispatch(new SharedActions.SetProgressBar(false));
      this.store.dispatch(new SharedActions.SetProgressSpinner(false));
      return new ExplorerActions.SuccessPost(results);
    });

  @Effect() getPostEffect$ = this.actions$.ofType(ExplorerActions.GET_POST)
    .map((action: ExplorerActions.GetPost) => action.payload)
    .switchMap((postId: number) => this.sharedService.getPost(postId)
      .map((post: Post) => new ExplorerActions.GetPostSuccess(post))
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() addPostCommentEffect$ = this.actions$.ofType(ExplorerActions.ADD_POST_COMMENT)
    .map((action: ExplorerActions.AddPostComment) => action.payload)
    .switchMap((postComment: PostComment) => this.sharedService.addPostComment(postComment)
      .map((result: PostComment) => new ExplorerActions.AddPostCommentSuccess(result))
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() delPostCommentEffect$ = this.actions$.ofType(ExplorerActions.DEL_POST_COMMENT)
    .map((action: ExplorerActions.DelPostComment) => action.payload)
    .switchMap((postCommentId: number) => this.sharedService.delPostComment(postCommentId)
      .map((result: PostComment) => new ExplorerActions.DelPostCommentSuccess(result))
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() addPostEvaluationEffect$ = this.actions$.ofType(ExplorerActions.ADD_POST_EVALUATION)
    .map((action: ExplorerActions.AddPostEvaluation) => action.payload)
    .switchMap((postEvaluation: PostEvaluation) => this.sharedService.addPostEvaluation(postEvaluation)
      .map((result: PostEvaluation) => new ExplorerActions.AddPostEvaluationSuccess(result))
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() delPostEvaluationEffect$ = this.actions$.ofType(ExplorerActions.DEL_POST_EVALUATION)
    .map((action: ExplorerActions.DelPostEvaluation) => action.payload)
    .switchMap((postEvaluationId: number) => this.sharedService.delPostEvaluation(postEvaluationId)
      .map((result: PostEvaluation) => new ExplorerActions.DelPostEvaluationSuccess(result))
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  constructor(private actions$: Actions, private sharedService: SharedService, private store: Store<Reducers.State>) {

  }
}
