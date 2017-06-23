import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom'
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';

import * as Reducers from '../../shared/reducers';
import * as LoginActions from './login-actions';
import { LoginService } from './login.service';
import { User } from 'app/shared/models/user';
import { Token } from 'app/shared/models/token';
import { UserSecret } from 'app/logins/shared/user-secret';
import { Auth } from 'app/shared/auth/auth.service';
import { Router } from '@angular/router'
import { go, replace, search, show, back, forward } from '@ngrx/router-store';

@Injectable()
export class LoginEffects {

  @Effect() loginEffect$ = this.actions$.ofType(LoginActions.LOGIN)
    .switchMap((action: LoginActions.Login) => this.auth.login(action.payload))
    .map((data) => {
      console.log('1');
      const userKey = data['uid'];

      return new LoginActions.ExistUser(userKey);
    });

  @Effect() existUserEffect$ = this.actions$.ofType(LoginActions.EXIST_USER)
    .map((action: LoginActions.ExistUser) => {
      console.log('2');
      return action.payload;
    })
    .switchMap((userKey: string) => this.loginService.existUser(userKey))
    .withLatestFrom(this.store)
    .map(([existUser, state]) => {
      if (existUser) {
        const userSecret: UserSecret = {
          userKey: state.login.userKey,
          userName: '',
          password: ''
        }
        return new LoginActions.GetToken(userSecret);
      }
    });

  @Effect() getTokenEffect$ = this.actions$.ofType(LoginActions.GET_TOKEN)
    .map((action: LoginActions.GetToken) => action.payload)
    .switchMap((userSecret: UserSecret) => this.loginService.getToken(userSecret))
    .map((token: Token) => {
      sessionStorage.setItem('userId', String(token.user.userId));
      localStorage.setItem('id_token', token.accessToken);
      console.log('3');

      return new LoginActions.SuccessUser(token.user);
    });

  @Effect() successUserEffect$ = this.actions$.ofType(LoginActions.SUCCESS_USER)
    .map((action: LoginActions.SuccessUser) => action.payload)
    .map((user: User) => go(['/users']));

  constructor(private actions$: Actions, private auth: Auth, private loginService: LoginService, private store: Store<Reducers.State>, private router: Router) {

  }
}
