import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import * as Reducers from '../../shared/reducers';
import * as SharedActions from '../../shared/shared-actions';
import { Auth } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router, private store: Store<Reducers.State>) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.authenticated()) {
      return true;
      // if (this.auth.isAdmin()) {
      //     return true;
      // } else {
      //     this.router.navigate(['unauthorized']);
      //     return false;
      // }
    } else {
      // Save URL to redirect to after login and fetching profile to get roles
      // localStorage.setItem('redirect_url', state.url);
      // this.auth.login();
      this.store.dispatch(new SharedActions.NavLogin());
      // this.router.navigate(['/login']);
      return false;
    }
  }
}
