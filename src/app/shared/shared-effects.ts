import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom'
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';

import { SharedService } from './shared.service';
import * as SharedActions from './shared-actions';

import * as Reducers from './reducers';

@Injectable()
export class SharedEffects {

  @Effect() specialEffect1$ = this.actions$.ofType(SharedActions.GET_USER)
    .map((action: SharedActions.GetUser) => action.payload)
    .switchMap((userKey) => this.sharedService.getUser(userKey))
    .map(results => new SharedActions.SuccessUser(results));

  // @Effect() specialEffect2$ = this.actions$.ofType(SharedActions.SET_PROGRESS)
  //   .map((action: SharedActions.SetProgress) => action.payload)
  //   .map(results => new SharedActions.(results));

  constructor(private actions$: Actions, private sharedService: SharedService, private store: Store<Reducers.State>) {

  }
}
