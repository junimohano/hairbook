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
        this.store.dispatch(new SharedActions.SetProgressBar(true));
      } else {
        this.store.dispatch(new SharedActions.SetProgressSpinner(true));
      }
      return state.user.isLast;
    })
    .filter(x => !x)
    .filter(() => sessionStorage.getItem('userId') !== undefined)
    .withLatestFrom(this.store, (payload, state) => ({ currentPostCount: state.user.currentPostCount, search: state.user.search }))
    .switchMap((results) => this.userService.getPosts(results.currentPostCount, Number(sessionStorage.getItem('userId')), results.search))
    .map(results => {
      this.store.dispatch(new SharedActions.SetProgressBar(false));
      this.store.dispatch(new SharedActions.SetProgressSpinner(false));
      return new UserActions.SuccessPost(results);
    });

  constructor(private actions$: Actions, private userService: UserService, private store: Store<Reducers.State>) {

  }
}
