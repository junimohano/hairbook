import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Reducers from '../../reducers';
import * as LoginActions from '../../../logins/shared/login-actions';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/shared/models/user';

@Component({
  selector: 'hb-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userName = '';

  constructor(private store: Store<Reducers.State>) { }

  ngOnInit() {
    this.store.select(Reducers.loginUser)
      .subscribe(x => {
        if (x) {
          this.userName = x.userName;
        }
      });
  }

}
