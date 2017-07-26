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

  getFriends(index: number, friendSearchType: FriendSearchType, userId: number, search: string): Observable<UserFriend[]> {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/UserFriends?index=${index}&userId=${userId}&friendSearchType=${friendSearchType}&search=${search}`)
      .map(res => res.json());
  }

  followFriend(userId: number, friendId: number) {
    const userFriend = <UserFriend>{
      createdUserId: userId,
      friendId: friendId
    }
    return this.authHttp.post(`${environment.webApiUrl}/api/v1/UserFriends`, userFriend, { headers: this.headers })
      .map(res => res.json());
  }

  unFollowFriend(userFriend: UserFriend) {
    return this.authHttp.delete(`${environment.webApiUrl}/api/v1/UserFriends/${userFriend.userFriendId}`)
      .map(res => res.json());
  }

}
