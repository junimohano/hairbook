import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom'
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';

import { UserService } from './user.service';
import * as UserActions from './user-actions';

import * as Reducers from '../../shared/reducers';

@Injectable()
export class UserEffects {
  // @Effect()
  // search$: Observable<Action> = this.actions$.ofType(PostActions.SEARCH)
  //   .map((action: PostActions.Search) => action.payload)
  //   .switchMap(terms => this.postService.getPosts())
  //   .map(results => new PostActions.SearchSuccess(results));

  @Effect() specialEffect$ = this.actions$.ofType(UserActions.SEARCH_POST)
    .withLatestFrom(this.store, (payload, state) => state.user.isLast)
    .filter(x => !x)
    .withLatestFrom(this.store, (payload, state) => {
      return ({ currentPostCount: state.user.currentPostCount, userId: state.shared.user.userId });
    })
    .switchMap((results) => this.userService.getPosts(results.currentPostCount, results.userId))
    .map(results => new UserActions.SuccessPost(results));

  constructor(private actions$: Actions, private userService: UserService, private store: Store<Reducers.State>) {

  }
}
