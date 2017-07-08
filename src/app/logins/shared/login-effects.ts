import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom'
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as Reducers from '../../shared/reducers';
import * as LoginActions from './login-actions';
import * as SharedActions from '../../shared/shared-actions';
import { LoginService } from './login.service';
import { User } from 'app/shared/models/user';
import { Token } from 'app/shared/models/token';
import { UserSecret } from 'app/logins/shared/user-secret';
import { Auth } from 'app/shared/auth/auth.service';
import { Router } from '@angular/router'
import { go, replace, search, show, back, forward } from '@ngrx/router-store';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs/Rx';

@Injectable()
export class LoginEffects {

  @Effect() loginSocialEffect$ = this.actions$.ofType(LoginActions.LOGIN_SOCIAL)
    .switchMap((action: LoginActions.LoginSocial) => this.auth.login(action.payload)
      .map(x => x)
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    )
    .mergeMap((data) => {
      console.log(LoginActions.LOGIN_SOCIAL, data);
      const userKey = data['uid'];

      return [
        new SharedActions.SetProgressBar(true),
        new LoginActions.ExistUser(userKey)
      ];
    });

  @Effect() existUserEffect$ = this.actions$.ofType(LoginActions.EXIST_USER)
    .map((action: LoginActions.ExistUser) => action.payload)
    .switchMap((userKey: string) => this.loginService.existUser(userKey)
      .map(x => x)
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    )
    .withLatestFrom(this.store)
    .mergeMap(([existUser, state]) => {
      state.shared.isProgressBar = true;

      console.log(LoginActions.EXIST_USER);

      if (existUser) {
        const userSecret = <UserSecret>{
          userKey: state.login.userKey
        }
        return [new LoginActions.GetToken(userSecret)];
      } else {
        return [go(['login', 'register']), new SharedActions.SetProgressBar(false)];
      }
    });

  @Effect() getTokenEffect$ = this.actions$.ofType(LoginActions.GET_TOKEN)
    .map((action: LoginActions.GetToken) => action.payload)
    .switchMap((userSecret: UserSecret) => this.loginService.getToken(userSecret)
      .mergeMap((token: Token) => {
        console.log(LoginActions.GET_TOKEN);

        sessionStorage.setItem('userId', String(token.user.userId));
        sessionStorage.setItem('userName', String(token.user.userName));
        localStorage.setItem('id_token', token.accessToken);

        return [new LoginActions.SetUser(token.user), new SharedActions.SetProgressBar(true)];
      })
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() setUserEffect$ = this.actions$.ofType(LoginActions.SET_USER)
    .map((action: LoginActions.SetUser) => action.payload)
    .mergeMap((user: User) => {
      console.log(LoginActions.SET_USER);

      return [go(['/users', user.userName]), new SharedActions.SetProgressBar(false)]
    });

  @Effect() registerEffect$ = this.actions$.ofType(LoginActions.REGISTER)
    .map((action: LoginActions.Register) => action.payload)
    .switchMap((user: User) => this.loginService.postUser(user)
      .map(x => x)
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    )
    .map((user: User) => {
      console.log(LoginActions.REGISTER);
      return go(['login']);
    });

  @Effect() existUserNameEffect$ = this.actions$.ofType(LoginActions.EXIST_USER_NAME)
    .map((action: LoginActions.ExistUserName) => action.payload)
    .switchMap((userName: string) => this.loginService.existUserName(userName)
      .map(x => x)
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    )
    .map((flag: boolean) => {
      console.log(LoginActions.EXIST_USER_NAME);
      return new LoginActions.ExistUserNameSuccess(flag);
    });

  constructor(private actions$: Actions,
    private auth: Auth,
    private loginService: LoginService,
    private store: Store<Reducers.State>,
    private router: Router) {

  }
}
