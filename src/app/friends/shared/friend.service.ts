import { FriendSearchType } from './friend-search-type';
import { UserFriend } from '../../shared/models/user-friend';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import { UserSecret } from 'app/logins/shared/user-secret';
import { Token } from 'app/shared/models/token';
import { User } from 'app/shared/models/user';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FriendService {

  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private authHttp: AuthHttp, private http: Http) {
  }

  getUserFriends(index: number, friendSearchType: FriendSearchType, userId: number, search: string): Observable<User[]> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/UserFriends?index=${index}&userId=${userId}&friendSearchType=${friendSearchType}&search=${search}`)
      .map(res => res.json());
  }

  getUsers(index: number, userId: number, search: string): Observable<User[]> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/Users?index=${index}&userId=${userId}&search=${search}`)
      .map(res => res.json());
  }

}
