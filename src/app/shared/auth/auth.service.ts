import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { environment } from '../../../environments/environment';
import { AuthService } from 'angular2-social-login/dist';
import { User } from 'app/shared/models/user';
import { Token } from 'app/shared/models/token';

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

    // this.router.navigate(['/']);
  };
}
