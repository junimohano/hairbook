import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Post } from 'app/shared/models/post';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/shared/models/user';

@Injectable()
export class UserService {

  headers: Headers = new Headers();

  constructor(private authHttp: AuthHttp) {
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
  }

  getPosts(index: number, userName: string, userNameParam: string, search: string): Observable<Post[]> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/posts?index=${index}&userName=${userName}&userNameParam=${userNameParam}&search=${search}`)
      .map(res => res.json())
      .map((results: Post[]) => {
        results.forEach((p: Post) => {
          p.postUploads.forEach(u => {
            u.path = `${environment.webApiUrl}/${u.path.split('\\').join('/')}`;
          });
        });
        return results;
      });
  }

  getUser(userName: string): Observable<User> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/users/GetByUserName/${userName}`)
      .map(res => res.json());
  }

  putUser(user: User): Observable<User> {
    return this.authHttp.put(`${environment.webApiUrl}/api/v1/users/${user.userId}`, user, this.headers)
      .map(res => res.json());
  }
}
