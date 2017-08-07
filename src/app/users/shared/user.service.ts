import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { User } from 'app/shared/models/user';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

import { UserUploadInfo } from './user-upload-info';

@Injectable()
export class UserService {

  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private authHttp: AuthHttp) {
  }

  getUser(userName: string, userId: number): Observable<User> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/users/GetByUserName/${userName}?userId=${userId}`)
      .map(res => res.json());
  }

  putUser(user: User): Observable<User> {
    return this.authHttp.put(`${environment.webApiUrl}/api/v1/users/${user.userId}`, user, { headers: this.headers })
      .map(res => res.json());
  }

  postUserImage(userUploadInfo: UserUploadInfo, userId: number): Observable<User> {
    const input = new FormData();
    input.append('uploadedFile', userUploadInfo.userUploadFile);
    input.append('uploadFileRotation', String(userUploadInfo.uploadFileRotation));
    return this.authHttp.post(`${environment.webApiUrl}/api/v1/users/PostUserImage/${userId}`, input)
      .map(res => res.json());
  }

}
