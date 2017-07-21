import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { UserSecret } from 'app/logins/shared/user-secret';
import { Token } from 'app/shared/models/token';
import { User } from 'app/shared/models/user';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private authHttp: AuthHttp, private http: Http) {
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
    return this.http.post(`${environment.webApiUrl}/api/v1/users/GetToken`, userSecret, { headers: this.headers })
      .map(res => res.json());
  }

  postUser(user: User): Observable<User> {
    return this.http.post(`${environment.webApiUrl}/api/v1/users`, user, { headers: this.headers })
      .map(res => res.json());
  }

}
