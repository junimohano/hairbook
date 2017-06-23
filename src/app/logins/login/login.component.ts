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
import * as Reducers from '../../shared/reducers';
import { Observable } from 'rxjs/Observable';
import { LoginService } from 'app/logins/shared/login.service';
import { UserSecret } from 'app/logins/shared/user-secret';
import { go } from '@ngrx/router-store';

@Component({
  selector: 'hb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    this.store.dispatch(new LoginActions.Login(provider));
  }

  signUp() {
    this.store.dispatch(go(['logins', 'create']));
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.logout();
  }
}
