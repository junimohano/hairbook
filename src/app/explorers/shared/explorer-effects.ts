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

@Injectable()
export class ExplorerEffects {
  // @Effect()
  // search$: Observable<Action> = this.actions$.ofType(PostActions.SEARCH)
  //   .map((action: PostActions.Search) => action.payload)
  //   .switchMap(terms => this.postService.getPosts())
  //   .map(results => new PostActions.SearchSuccess(results));

  @Effect() specialEffect$ = this.actions$.ofType(ExplorerActions.SEARCH_POST)
    .debounceTime(100)
    .withLatestFrom(this.store, (payload, state) => {
      if (state.explorer.posts.length === 0) {
        this.store.dispatch(new SharedActions.SetProgressBar(true));
      }
      this.store.dispatch(new SharedActions.SetProgressSpinner(true));
      return state.explorer.isLast;
    })
    .filter(x => !x)
    .filter(() => sessionStorage.getItem('userId') !== undefined)
    .withLatestFrom(this.store, (payload, state) => ({ currentPostCount: state.explorer.currentPostCount, search: state.explorer.search }))
    .switchMap((results) => this.explorerService.getPosts(results.currentPostCount, Number(sessionStorage.getItem('userId')), AccessType.Public, results.search))
    .map(results => {
      this.store.dispatch(new SharedActions.SetProgressBar(false));
      this.store.dispatch(new SharedActions.SetProgressSpinner(false));
      return new ExplorerActions.SuccessPost(results);
    });

  constructor(private actions$: Actions, private explorerService: ExplorerService, private store: Store<Reducers.State>) {

  }
}
