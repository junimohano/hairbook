import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from 'environments/environment';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Post } from 'app/shared/models/post';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/shared/models/user';
import { PostComment } from 'app/shared/models/post-comment';
import { PostEvaluation } from 'app/shared/models/post-evaluation';

@Injectable()
export class UserService {

  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private authHttp: AuthHttp) {
  }

  getUser(userName: string): Observable<User> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/users/GetByUserName/${userName}`)
      .map(res => res.json());
  }

  putUser(user: User): Observable<User> {
    return this.authHttp.put(`${environment.webApiUrl}/api/v1/users/${user.userId}`, user, { headers: this.headers })
      .map(res => res.json());
  }

}
