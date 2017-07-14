import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from 'environments/environment';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { Auth } from 'app/shared/auth/auth.service';
import { User } from 'app/shared/models/user';
import { Token } from 'app/shared/models/token';
import { UserSecret } from 'app/logins/shared/user-secret';
import { of } from 'rxjs/observable/of';
import * as SharedActions from '../../shared/shared-actions';
import { Observable } from 'rxjs/Observable';
import { HairMenu } from 'app/shared/models/hair-menu';
import { HairType } from 'app/shared/models/hair-type';
import { Post } from 'app/shared/models/post';
import { Customer } from 'app/shared/models/customer';

@Injectable()
export class PostService {

  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private authHttp: AuthHttp) {
  }

  getHairMenus(): Observable<HairMenu[]> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/posts/HairMenus`)
      .map(res => res.json());
  }

  getHairTypes(): Observable<HairType[]> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/posts/HairTypes`)
      .map(res => res.json());
  }

  addPost(post: Post): Observable<Post> {
    return this.authHttp.post(`${environment.webApiUrl}/api/v1/posts`, post, { headers: this.headers })
      .map(res => res.json());
  }

  editPost(post: Post): Observable<Post> {
    return this.authHttp.put(`${environment.webApiUrl}/api/v1/posts`, post, { headers: this.headers })
      .map(res => res.json());
  }

  getCustomers(userId: number): Observable<Customer[]> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/posts/Customers/${userId}`)
      .map(res => res.json());
  }

  addUpload(postId: number, fileToUpload: any) {
    const input = new FormData();
    input.append('uploadedFile', fileToUpload);
    return this.authHttp.post(`${environment.webApiUrl}/api/v1/PostUploads?postId=${postId}`, input)
      .map(res => res.json());
  }

}
