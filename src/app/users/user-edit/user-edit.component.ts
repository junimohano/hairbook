import { UserUploadInfoType } from '../shared/user-upload-info-type';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { GenderType } from 'app/shared/models/enums/gender-type';
import { User } from 'app/shared/models/user';
import { Subscription } from 'rxjs/Subscription';

import { Auth } from '../../shared/auth/auth.service';
import { UploadFileRotation } from '../../shared/models/enums/upload-file-rotation';
import * as Reducers from '../../shared/reducers';
import * as UserActions from '../shared/user-actions';
import { UserUploadInfo } from '../shared/user-upload-info';
import { ImagePathPipe } from 'app/shared/pipes/image-path.pipe';

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
  userUploadInfoType = UserUploadInfoType;

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

          const imagePathPipe = new ImagePathPipe();
          this.user.userUploadInfo = new UserUploadInfo({
            userUploadBlob: imagePathPipe.transform(x.image, null),
            uploadFileRotation: UploadFileRotation.Rotation0,
            userUploadInfoType: UserUploadInfoType.Update
          });

        }
      });
  }

  ngOnInit() {
    const userName = this.auth.userName
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
        userUploadInfo: this.user.userUploadInfo
      };
      const p1 = this.editForm.get('password').value;
      const p2 = this.editForm.get('password_confirm').value;
      if (p1 === p2 && p1 && p2) {
        user.password = p1;
      }

      this.store.dispatch(new UserActions.EditUser(user));
    }
  }

  onRotateImage() {
    switch (this.user.userUploadInfo.uploadFileRotation) {
      case UploadFileRotation.Rotation0:
        this.user.userUploadInfo.uploadFileRotation = UploadFileRotation.Rotation90;
        break;

      case UploadFileRotation.Rotation90:
        this.user.userUploadInfo.uploadFileRotation = UploadFileRotation.Rotation180;
        break;

      case UploadFileRotation.Rotation180:
        this.user.userUploadInfo.uploadFileRotation = UploadFileRotation.Rotation270;
        break;

      case UploadFileRotation.Rotation270:
        this.user.userUploadInfo.uploadFileRotation = UploadFileRotation.Rotation0;
        break;
    }
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files) {
      for (let i = 0; i < fileInput.target.files.length; i++) {
        const file = fileInput.target.files[i];
        const reader = new FileReader();

        reader.onload = (event: any) => {
          this.user.userUploadInfo = new UserUploadInfo({
            userUploadFile: file,
            userUploadBlob: event.target.result,
            uploadFileRotation: UploadFileRotation.Rotation0,
            userUploadInfoType: UserUploadInfoType.Add
          });
        }

        reader.readAsDataURL(file);
      }
    }
  }

}
