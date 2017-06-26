import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Auth } from 'app/shared/auth/auth.service';
import { User } from 'app/shared/models/user';
import { Observable } from 'rxjs/Observable';
import { Token } from 'app/shared/models/token';
import { UserSecret } from 'app/logins/shared/user-secret';
import { of } from 'rxjs/observable/of';
import * as SharedActions from '../../shared/shared-actions';

@Injectable()
export class LoginService {

  headers: Headers = new Headers();

  constructor(private authHttp: AuthHttp, private http: Http) {
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  existUser(userKey: string): Observable<boolean> {
    return this.http.get(`${environment.webApiUrl}/api/v1/users/ExistUser/${userKey}`)
      .map(res => res.json());
  }

  existUserName(userName: string): Observable<boolean> {
    return this.http.get(`${environment.webApiUrl}/api/v1/users/ExistUserName/${userName}`)
      .map(res => res.json());
  }

  getToken(userSecret: UserSecret): Observable<Token> {
    return this.http.post(`${environment.webApiUrl}/api/v1/users/GetToken`, userSecret, this.headers)
      .map(res => res.json());
  }

  postUser(user: User): Observable<User> {
    return this.http.post(`${environment.webApiUrl}/api/v1/users`, user, this.headers)
      .map(res => res.json());
  }

}
