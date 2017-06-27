import { Component, OnInit, OnDestroy } from '@angular/core';
import { Auth } from '../../shared/auth/auth.service';
// import { myConfig } from '../../shared/auth/auth.config';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from '../shared/user-actions';
import * as Reducers from '../../shared/reducers';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/shared/models/user';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { GenderType } from 'app/shared/models/enums/gender-type';
import { Subscription } from 'rxjs/Subscription';

function customWatcher(c: AbstractControl) {
  if (!c.get('password') || !c.get('password_confirm')) {
    return null;
  };

  let result = {};
  if (c.get('password').value !== c.get('password_confirm').value) {
    result = { ...result, 'password nomatch': true }
  }

  return result;
}

@Component({
  selector: 'hb-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {

  user: User;
  editForm: FormGroup;

  genders = GenderType;
  genderKeys: any[];

  userSubscription: Subscription;

  constructor(private fb: FormBuilder, public auth: Auth, private authHttp: AuthHttp, private router: Router, private store: Store<Reducers.State>) {
    this.genderKeys = Object.keys(this.genders).filter(Number);

    this.editForm = this.fb.group({
      userName: '',
      password: '',
      password_confirm: '',
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')])],
      name: ['', Validators.required],
      birthday: '',
      phone: '',
      gender: String(GenderType.Undefined),
      // image: ['', Validators.required],
    }, { validator: customWatcher });

    this.userSubscription = this.store.select(Reducers.userUser)
      .subscribe(x => {
        if (x) {
          console.log(x);
          this.user = x;
          this.editForm.get('userName').setValue(this.user.userName);
          this.editForm.get('email').setValue(this.user.email);
          this.editForm.get('name').setValue(this.user.name);
          if (this.user.birthday !== null) {
            this.editForm.get('birthday').setValue(new Date(this.user.birthday).toLocaleDateString('en-US'));
          }
          this.editForm.get('phone').setValue(this.user.phone);
          this.editForm.get('gender').setValue(String(this.user.gender));
        }
      });
  }

  ngOnInit() {
    const userName = sessionStorage.getItem('userName');
    console.log('userName : ', userName);
    this.store.dispatch(new UserActions.GetUser(userName));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onBack() {
    this.store.dispatch(back());
  }

  confirm() {
    if (this.editForm.valid) {
      const user = <User>{
        userId: this.user.userId,
        userKey: this.user.userKey,
        userName: this.user.userName,
        // password: string;
        email: this.editForm.get('email').value,
        // image: string;
        name: this.editForm.get('name').value,

        gender: this.editForm.get('gender').value,
        birthday: this.editForm.get('birthday').value,
        phone: this.editForm.get('phone').value,

        // salonId: number | null;
      };
      this.store.dispatch(new UserActions.EditUser(user));
    }
  }
}
