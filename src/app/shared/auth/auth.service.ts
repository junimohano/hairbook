import { GoogleLoginProvider } from 'angular4-social-login/dist/a4sl-flat';
import { FacebookLoginProvider, AuthService } from 'angular4-social-login/dist';
import 'rxjs/add/operator/filter';

import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class Auth {

  constructor(private authService: AuthService) {
  };

  public login(provider: string) {
    if (provider === 'facebook') {
      return this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    } else {
      return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
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
