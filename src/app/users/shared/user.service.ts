import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Post } from 'app/users/shared/models/post';

@Injectable()
export class UserService {

  constructor(private authHttp: AuthHttp) { }

  getPosts(index: number, userId: number, search: string) {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/posts?index=${index}&userId=${userId}&search=${search}`)
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
}
