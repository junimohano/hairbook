import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom'
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';

import { UserService } from './user.service';
import * as UserActions from './user-actions';
import * as SharedActions from '../../shared/shared-actions';
import * as Reducers from '../../shared/reducers';

@Injectable()
export class UserEffects {
  // @Effect()
  // search$: Observable<Action> = this.actions$.ofType(PostActions.SEARCH)
  //   .map((action: PostActions.Search) => action.payload)
  //   .switchMap(terms => this.postService.getPosts())
  //   .map(results => new PostActions.SearchSuccess(results));

  @Effect() specialEffect$ = this.actions$.ofType(UserActions.SEARCH_POST)
    .debounceTime(100)
    .withLatestFrom(this.store, (payload, state) => {
      if (state.user.posts.length === 0) {
        this.store.dispatch(new SharedActions.SetProgress(true));
      }
      this.store.dispatch(new SharedActions.SetCircleProgress(true));
      return state.user.isLast;
    })
    .filter(x => !x)
    .filter(() => sessionStorage.getItem('userId') !== undefined)
    .withLatestFrom(this.store, (payload, state) => state.user.currentPostCount)
    .switchMap((results) => this.userService.getPosts(results, Number(sessionStorage.getItem('userId'))))
    .map(results => {
      this.store.dispatch(new SharedActions.SetCircleProgress(false));
      this.store.dispatch(new SharedActions.SetProgress(false));
      return new UserActions.SuccessPost(results);
    });

  constructor(private actions$: Actions, private userService: UserService, private store: Store<Reducers.State>) {

  }
}
