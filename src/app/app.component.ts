import { Component, HostListener, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Auth } from './shared/auth/auth.service';
import * as Reducers from './shared/reducers';
import * as SharedActions from './shared/shared-actions';

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
