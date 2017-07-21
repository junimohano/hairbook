import 'rxjs/add/operator/filter';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthService } from 'angular2-social-login/dist';

@Injectable()
export class Auth {

  constructor(private router: Router, private authService: AuthService) {

  };

  public login(provider: string) {
    return this.authService.login(provider);
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    // return tokenNotExpired();
    return tokenNotExpired('id_token');
  };

  public logout() {
    localStorage.removeItem('id_token');
    // localStorage.removeItem('profile');
    // localStorage.removeItem('redirect_url');
  };

  public setLoginData(userId: string, userName: string, accessToken: string) {
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('userName', userName);
    localStorage.setItem('id_token', accessToken);
  }

  get userId(): number {
    return +sessionStorage.getItem('userId');
  };

  get userName(): string {
    return sessionStorage.getItem('userName');
  };

}
