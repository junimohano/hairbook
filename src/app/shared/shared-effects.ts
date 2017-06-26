import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom'
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';

import * as Reducers from './reducers';
import * as SharedActions from './shared-actions';
import { User } from 'app/shared/models/user';
import { Token } from 'app/shared/models/token';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class SharedEffects {

  @Effect() setSnackBarEffect$ = this.actions$.ofType(SharedActions.SET_SNACK_BAR)
    .map((action: SharedActions.SetSnackBar) => {
      this.snackBar.open(action.payload, 'close', {
        duration: 5000,
      })
      console.log(action.payload);

      return new SharedActions.SetProgressBar(false);
    });

  constructor(private actions$: Actions, private store: Store<Reducers.State>, private snackBar: MdSnackBar) {

  }
}
