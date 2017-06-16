import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';

@Injectable()
export class SharedService {

  constructor(private authHttp: AuthHttp) { }

  getUser(userKey: string) {
    return this.authHttp.get(`${environment.webApiUrl}/api/v1/users/0?userKey=${userKey}`)
      .map(res => res.json());
  }
}
