import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { myConfig } from './auth.config';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { environment } from '../../../environments/environment';
import { SharedService } from '../shared.service';
import { Store } from '@ngrx/store';
import * as Reducers from '../../shared/reducers';
import * as SharedActions from '../../shared/shared-actions';

declare var require: any;

// Avoid name not found warnings
// declare var Auth0Lock: any;
const Auth0Lock = require('auth0-lock').default;

@Injectable()
export class Auth {

  // Configure Auth0
  lock = new Auth0Lock(myConfig.clientID, myConfig.domain, {
    // auth: {
    //     redirect: false
    // },
    // theme: {
    //     logo: "test-icon.png",
    //     primaryColor: "#b81b1c"
    // },
    additionalSignUpFields: [{
      name: 'address',                              // required
      placeholder: 'enter your address',            // required
      icon: 'https://example.com/address_icon.png', // optional
      validator: function (value) {                  // optional
        // only accept addresses with more than 10 chars
        return value.length > 10;
      }
    }],
    languageDictionary: {
      title: 'Jun'
    }
  });

  // Store profile object in auth class
  userProfile: any;

  constructor(private router: Router, private store: Store<Reducers.State>) {
    // Set userProfile attribute if already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));

    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        profile.user_metadata = profile.user_metadata || {};
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;

        this.store.dispatch(new SharedActions.GetUser(profile.identities[0].user_id));

        this.store.select(Reducers.selectUser).subscribe(user => {
          if (user != null) {
            this.router.navigate(['/users']);
          }
        });

      });
    });

  };

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    // return tokenNotExpired();
    return tokenNotExpired('id_token');
  };

  public logout() {
    // Remove token and profile from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('redirect_url');
    this.userProfile = undefined;

    this.router.navigate(['/']);
  };
}
