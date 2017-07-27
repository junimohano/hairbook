import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Auth } from '../../shared/auth/auth.service';
import * as Reducers from '../../shared/reducers';
import * as SharedActions from '../../shared/shared-actions';

@Component({
  selector: 'hb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SearchComponent implements OnInit {

  constructor(private auth: Auth, private store: Store<Reducers.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new SharedActions.SetIsPreventRefreshingPosts(true));
  }

}
