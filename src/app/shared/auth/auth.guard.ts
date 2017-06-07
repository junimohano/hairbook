import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Auth } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: Auth, private router: Router) {

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
            localStorage.setItem('redirect_url', state.url);
            this.auth.login();
            // this.router.navigate(['/login']);
            return false;
        }
    }
}
