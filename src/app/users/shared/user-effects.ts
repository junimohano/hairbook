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
import { User } from 'app/shared/models/user';
import { of } from 'rxjs/observable/of';
import { go, back } from '@ngrx/router-store';
import { Post } from 'app/shared/models/post';
import { PostComment } from 'app/shared/models/post-comment';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { SharedService } from 'app/shared/shared.service';
import { AccessType } from 'app/shared/models/enums/access-type';

@Injectable()
export class UserEffects {

  @Effect() getUserEffect$ = this.actions$.ofType(UserActions.GET_USER)
    .map((action: UserActions.GetUser) => action.payload)
    .switchMap((userName: string) => this.userService.getUser(userName)
      .map((user: User) => new UserActions.GetUserSuccess(user))
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() editUserEffect$ = this.actions$.ofType(UserActions.EDIT_USER)
    .map((action: UserActions.EditUser) => action.payload)
    .switchMap((user: User) => this.userService.putUser(user)
      .map(x => back())
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  constructor(private actions$: Actions, private userService: UserService, private sharedService: SharedService, private store: Store<Reducers.State>) {

  }
}
