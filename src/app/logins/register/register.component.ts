import { Subscription } from 'rxjs/Rx';
import { Subscribable } from 'rxjs/Observable';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginService } from 'app/logins/shared/login.service';
import { GenderType } from 'app/shared/models/enums/gender-type';
import { User } from 'app/shared/models/user';

import * as Reducers from '../../shared/reducers';
import * as LoginActions from '../shared/login-actions';
import * as SharedActions from '../../shared/shared-actions';

function customWatcher(c: AbstractControl) {
  if (!c.get('password') || !c.get('password_confirm') || !c.get('userName') || !c.get('userName_confirm')) {
    return null;
  };

  let result = {};
  if (c.get('password').value !== c.get('password_confirm').value) {
    result = { ...result, 'password nomatch': true }
  }

  if (c.get('userName_confirm').value) {
    result = { ...result, 'username is duplicated': true }
  }

  return result;
}

@Component({
  selector: 'hb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  existUserNameSubscription: Subscription;
  loginSocialUserSubscription: Subscription;

  constructor(private fb: FormBuilder, private store: Store<Reducers.State>, public loginService: LoginService, private router: Router) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      userName_confirm: false,
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
      password_confirm: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')])],
      image: '',
      userKey: '',
      provider: ''
    }, { validator: customWatcher });

    this.existUserNameSubscription = this.store.select(Reducers.existUserName)
      .subscribe(x => this.registerForm.get('userName_confirm').setValue(x));

    this.loginSocialUserSubscription = this.store.select(Reducers.loginSocialUser)
      .subscribe(x => {
        if (x) {
          console.log(x);
          this.registerForm.patchValue({
            image: x.photoUrl,
            userKey: x.id,
            provider: x.provider,
            name: x.name,
            email: x.email
          });
        }
      });
  }

  ngOnInit() {
  }

  public ngOnDestroy(): void {
    this.existUserNameSubscription.unsubscribe();
    this.loginSocialUserSubscription.unsubscribe();
  }

  valueChange(event) {
    console.log(event);
    this.store.dispatch(new LoginActions.ExistUserName(event));
  }

  register() {
    if (this.registerForm.valid) {
      const user = <User>{
        userId: 0,
        userKey: this.registerForm.get('userKey').value,
        userName: this.registerForm.get('userName').value,
        password: this.registerForm.get('password').value,
        email: this.registerForm.get('email').value,
        image: this.registerForm.get('image').value,
        name: this.registerForm.get('name').value,
        gender: GenderType.Undefined,
        birthday: null,
        phone: '',
        provider: this.registerForm.get('provider').value
      };

      this.store.dispatch(new LoginActions.Register(user));
    }
  }

  cancel() {
    this.store.dispatch(new SharedActions.NavLogin());
  }



}
