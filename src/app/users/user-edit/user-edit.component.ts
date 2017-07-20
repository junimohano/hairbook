import { UserInfo } from '../shared/user-info';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { GenderType } from 'app/shared/models/enums/gender-type';
import { User } from 'app/shared/models/user';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

import { Auth } from '../../shared/auth/auth.service';
import * as Reducers from '../../shared/reducers';
import * as UserActions from '../shared/user-actions';

// import { myConfig } from '../../shared/auth/auth.config';
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

  @ViewChild('fileInput') fileInput;

  user: User;
  editForm: FormGroup;

  genders = GenderType;
  genderKeys: any[];

  userSubscription: Subscription;

  constructor(private fb: FormBuilder, public auth: Auth, private authHttp: AuthHttp, private router: Router, private store: Store<Reducers.State>, private location: Location) {
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
    this.location.back();
  }

  onSubmit() {
    if (this.editForm.valid) {
      const user = <User>{
        userId: this.user.userId,
        userKey: this.user.userKey,
        userName: this.user.userName,
        password: this.user.password,
        email: this.editForm.get('email').value,
        image: this.user.image,
        name: this.editForm.get('name').value,

        gender: this.editForm.get('gender').value,
        birthday: this.editForm.get('birthday').value,
        phone: this.editForm.get('phone').value,

        // salonId: number | null;
      };
      const p1 = this.editForm.get('password').value;
      const p2 = this.editForm.get('password_confirm').value;
      if (p1 === p2 && p1 && p2) {
        user.password = p1;
      }

      this.store.dispatch(new UserActions.EditUser(user));
    }
  }

  onChangeImage() {
    const fi = this.fileInput.nativeElement;
    const userInfo = <UserInfo>{
      user: this.user,
      userUpload: fi.files[0]
    }

    this.store.dispatch(new UserActions.EditUserImage(userInfo));
  }

}
