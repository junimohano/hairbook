import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom'
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';

import * as Reducers from './reducers';
import * as SharedActions from './shared-actions';
import { SharedService } from './shared.service';
import { User } from 'app/users/shared/models/user';

@Injectable()
export class SharedEffects {

  @Effect() specialEffect1$ = this.actions$.ofType(SharedActions.GET_USER)
    .map((action: SharedActions.GetUser) => action.payload)
    .switchMap((userKey) => this.sharedService.getUser(userKey))
    .map((user: User) => {
      sessionStorage.setItem('userId', String(user.userId));
      return new SharedActions.SuccessUser(user.userId);
    });

  constructor(private actions$: Actions, private sharedService: SharedService, private store: Store<Reducers.State>) {

  }
}
