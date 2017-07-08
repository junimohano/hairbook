import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../shared/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from 'angular2-social-login';
import { User } from 'app/shared/models/user';
import { Token } from 'app/shared/models/token';

import { Store } from '@ngrx/store';
import * as LoginActions from '../shared/login-actions';
import * as SharedActions from '../../shared/shared-actions';
import * as UserActions from '../../users/shared/user-actions';
import * as Reducers from '../../shared/reducers';
import { Observable } from 'rxjs/Observable';
import { LoginService } from 'app/logins/shared/login.service';
import { UserSecret } from 'app/logins/shared/user-secret';
import { go } from '@ngrx/router-store';

@Component({
  selector: 'hb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // param = { value: 'world' };

  // setLanguage(lang) {
  //   this.translate.use(lang);
  // }

  loginForm: FormGroup;
  userKey = '';
  user$: Observable<User>;

  constructor(private fb: FormBuilder, public auth: Auth, private store: Store<Reducers.State>, private translate: TranslateService, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.user$ = this.store.select(Reducers.loginUser);
  }

  signIn(provider) {
    this.store.dispatch(new LoginActions.LoginSocial(provider));
  }

  login() {
    if (this.loginForm.valid) {
      const userSecret = <UserSecret>{
        userName: this.loginForm.get('userName').value,
        password: this.loginForm.get('password').value
      }

      this.store.dispatch(new LoginActions.GetToken(userSecret));
    }
  }

  signUp() {
    this.store.dispatch(go(['login', 'register']));
  }

  logout() {
    this.store.dispatch(new SharedActions.ResetState());
    this.auth.logout();
  }

  ngOnInit() {
    this.logout();
  }
}
