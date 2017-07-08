import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, NG_VALIDATORS } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as LoginActions from '../shared/login-actions';
import * as Reducers from '../../shared/reducers';
import { Observable } from 'rxjs/Observable';
import { go } from '@ngrx/router-store';
import { User } from 'app/shared/models/user';
import { GenderType } from 'app/shared/models/enums/gender-type';
import { LoginService } from 'app/logins/shared/login.service';

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
  styleUrls: ['./register.component.scss'],
  // providers: [
  //   { provide: NG_VALIDATORS, multi: true, useValue: passwordWatcher }
  // ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<Reducers.State>, public loginService: LoginService) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      userName_confirm: false,
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
      password_confirm: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])],
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')])]
    }, { validator: customWatcher });

    this.store.select(Reducers.existUserName)
      .subscribe(x => this.registerForm.get('userName_confirm').setValue(x));
  }

  ngOnInit() {
  }

  valueChange(event) {
    console.log(event);
    this.store.dispatch(new LoginActions.ExistUserName(event));
  }

  register() {
    if (this.registerForm.valid) {
      const user = <User>{
        userId: 0,
        userKey: '',
        userName: this.registerForm.get('userName').value,
        password: this.registerForm.get('password').value,
        email: this.registerForm.get('email').value,
        image: '',
        name: this.registerForm.get('name').value,
        gender: GenderType.Undefined,
        birthday: null,
        phone: ''
      };

      this.store.dispatch(new LoginActions.Register(user));
    }
  }

  cancel() {
    this.store.dispatch(go(['login']));
  }

}
