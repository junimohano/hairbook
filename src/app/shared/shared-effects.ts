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

@Injectable()
export class SharedEffects {

  constructor(private actions$: Actions, private store: Store<Reducers.State>) {

  }
}
