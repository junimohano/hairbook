import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom'
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';

import { PostService } from './post.service';
import * as PostActions from './post-actions';

import * as Reducers from '../../shared/reducers';

@Injectable()
export class PostEffects {
  // @Effect()
  // search$: Observable<Action> = this.actions$.ofType(PostActions.SEARCH)
  //   .map((action: PostActions.Search) => action.payload)
  //   .switchMap(terms => this.postService.getPosts())
  //   .map(results => new PostActions.SearchSuccess(results));

@Effect() specialEffect$ = this.actions$.ofType(PostActions.SEARCH_POST)
    .withLatestFrom(this.store, (payload, state) => state.post.isLast)
    .filter(x => !x)
    .withLatestFrom(this.store, (payload, state) => state.post.currentIndex)
    .switchMap((index) => this.postService.getPosts(index))
    .map(results => new PostActions.SuccessPost(results));

  constructor(private actions$: Actions, private postService: PostService, private store: Store<Reducers.State>) {

  }
}
