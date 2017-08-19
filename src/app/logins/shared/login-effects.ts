
import { SocialUser } from 'angular4-social-login';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UserSecret } from 'app/logins/shared/user-secret';
import { Auth } from 'app/shared/auth/auth.service';
import { Token } from 'app/shared/models/token';
import { User } from 'app/shared/models/user';
import { of } from 'rxjs/observable/of';

import * as Reducers from '../../shared/reducers';
import * as SharedActions from '../../shared/shared-actions';
import * as LoginActions from './login-actions';
import { LoginService } from './login.service';

@Injectable()
export class LoginEffects {

  @Effect() loginSocialEffect$ = this.actions$.ofType(LoginActions.LOGIN_SOCIAL)
    .map((action: LoginActions.LoginSocial) => action.payload)
    .switchMap((provider: string) => this.auth.login(provider)
      .then(socialUser => {
        console.log(LoginActions.LOGIN_SOCIAL, socialUser);
        this.store.dispatch(new SharedActions.SetProgressBar(true));

        // const socialUserTemp = <SocialUser>{
        //   provider: 'facebook',
        //   id: socialUser.authResponse.userID,
        //   email: '',
        //   name: '',
        //   photoUrl: 'string'
        // };

        return new LoginActions.ExistUser(socialUser);
      })
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() existUserEffect$ = this.actions$.ofType(LoginActions.EXIST_USER)
    .map((action: LoginActions.ExistUser) => action.payload)
    .switchMap((socialUser: SocialUser) => this.loginService.existUser(socialUser.id)
      .withLatestFrom(this.store)
      .map(([existUser, state]) => {
        console.log(LoginActions.EXIST_USER);

        if (existUser) {
          const userSecret = <UserSecret>{
            userKey: state.login.socialUser.id
          }
          return new LoginActions.GetToken(userSecret);
        } else {
          this.store.dispatch(new SharedActions.SetProgressBar(false));
          return new SharedActions.NavLoginRegister();
        }
      })
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() getTokenEffect$ = this.actions$.ofType(LoginActions.GET_TOKEN)
    .map((action: LoginActions.GetToken) => action.payload)
    .switchMap((userSecret: UserSecret) => this.loginService.getToken(userSecret)
      .map((token: Token) => {
        console.log(LoginActions.GET_TOKEN);
        this.store.dispatch(new SharedActions.SetProgressBar(true));
        this.auth.setLoginData(String(token.user.userId), String(token.user.userName), token.accessToken);
        return new LoginActions.SetUser(token.user);
      })
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() setUserEffect$ = this.actions$.ofType(LoginActions.SET_USER)
    .map((action: LoginActions.SetUser) => action.payload)
    .map((user: User) => {
      console.log(LoginActions.SET_USER);
      this.store.dispatch(new SharedActions.SetProgressBar(false));
      return new SharedActions.NavUsers(user.userName);
    });

  @Effect() registerEffect$ = this.actions$.ofType(LoginActions.REGISTER)
    .map((action: LoginActions.Register) => action.payload)
    .switchMap((user: User) => this.loginService.postUser(user)
      .map((x: User) => {
        console.log(LoginActions.REGISTER);
        return new SharedActions.NavLogin();
      })
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() existUserNameEffect$ = this.actions$.ofType(LoginActions.EXIST_USER_NAME)
    .map((action: LoginActions.ExistUserName) => action.payload)
    .switchMap((userName: string) => this.loginService.existUserName(userName)
      .map((flag: boolean) => {
        console.log(LoginActions.EXIST_USER_NAME);
        return new LoginActions.ExistUserNameSuccess(flag);
      })
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  constructor(private actions$: Actions,
    private auth: Auth,
    private loginService: LoginService,
    private store: Store<Reducers.State>,
    private router: Router) {

  }
}
