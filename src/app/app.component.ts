import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Auth } from './shared/auth/auth.service';

import { Store } from '@ngrx/store';
import * as Reducers from './shared/reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'hb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  isProgressBar$: Observable<boolean>;

  constructor(public auth: Auth, private store: Store<Reducers.State>) {
    this.isProgressBar$ = store.select(Reducers.sharedIsProgressBar);
  }
}
