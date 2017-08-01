import { UserFriend } from '../../shared/models/user-friend';
import { Auth } from '../../shared/auth/auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { User } from 'app/shared/models/user';
import { SharedService } from 'app/shared/shared.service';
import { of } from 'rxjs/observable/of';

import * as Reducers from '../../shared/reducers';
import * as SharedActions from '../../shared/shared-actions';
import * as UserActions from './user-actions';
import { UserInfo } from './user-info';
import { UserService } from './user.service';

@Injectable()
export class UserEffects {

  @Effect() getUserEffect$ = this.actions$.ofType(UserActions.GET_USER)
    .map((action: UserActions.GetUser) => action.payload)
    .switchMap((userName: string) => this.userService.getUser(userName, this.auth.userId)
      .map((user: User) => new UserActions.GetUserSuccess(user))
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() editUserEffect$ = this.actions$.ofType(UserActions.EDIT_USER)
    .map((action: UserActions.EditUser) => action.payload)
    .switchMap((user: User) => this.userService.putUser(user)
      .map(x => {
        this.location.back();
        return new SharedActions.NoAction();
      })
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );


  @Effect() editUserImageEffect$ = this.actions$.ofType(UserActions.EDIT_USER_IMAGE)
    .map((action: UserActions.EditUserImage) => action.payload)
    .switchMap((userInfo: UserInfo) => {
      this.store.dispatch(new SharedActions.SetProgressBar(true));

      return this.userService.postUserImage(userInfo)
        .map(x => {
          this.store.dispatch(new SharedActions.SetProgressBar(false));
          return new UserActions.GetUserSuccess(x)
        })
        .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    });

  @Effect() addUserFriendEffect$ = this.actions$.ofType(UserActions.ADD_USER_FRIEND)
    .map((action: UserActions.AddUserFriend) => action.payload)
    .switchMap((userFriend: UserFriend) => this.sharedService.addUserFriend(userFriend)
      .map((result: UserFriend) => new UserActions.AddUserFriendSuccess(result))
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() delUserFriendEffect$ = this.actions$.ofType(UserActions.DEL_USER_FRIEND)
    .map((action: UserActions.DelUserFriend) => action.payload)
    .switchMap((friendId: number) => this.sharedService.delUserFriend(this.auth.userId, friendId)
      .map((result: UserFriend) => new UserActions.DelUserFriendSuccess(result))
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  constructor(private actions$: Actions,
    private userService: UserService,
    private auth: Auth,
    private sharedService: SharedService,
    private store: Store<Reducers.State>,
    private location: Location) {
  }
}
