import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Post } from 'app/shared/models/post';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/shared/models/user';

@Injectable()
export class UserService {

  constructor(private authHttp: AuthHttp) { }

  getPosts(index: number, userName: string, search: string): Observable<Post[]> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/posts?index=${index}&userName=${userName}&search=${search}`)
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
}
