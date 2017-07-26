import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { UserSecret } from 'app/logins/shared/user-secret';
import { User } from 'app/shared/models/user';
import { Observable } from 'rxjs/Observable';

import { Auth } from '../../shared/auth/auth.service';
import * as Reducers from '../../shared/reducers';
import * as SharedActions from '../../shared/shared-actions';
import * as LoginActions from '../shared/login-actions';

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

  constructor(private fb: FormBuilder, public auth: Auth, private store: Store<Reducers.State>, private translate: TranslateService) {
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
    this.store.dispatch(new SharedActions.NavLoginRegister());
  }

  logout() {
    this.store.dispatch(new SharedActions.ResetState());
    this.auth.logout();
  }

  ngOnInit() {
    this.logout();
  }
}
