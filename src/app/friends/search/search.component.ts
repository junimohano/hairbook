import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { Auth } from '../../shared/auth/auth.service';
import { User } from '../../shared/models/user';
import * as Reducers from '../../shared/reducers';
import * as SharedActions from '../../shared/shared-actions';
import * as FriendActions from '../shared/friend-actions';
import { FriendSearchInfo } from '../shared/friend-search-info';
import { FriendSearchType } from '../shared/friend-search-type';

@Component({
  selector: 'hb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  users$: Observable<User[]>;

  constructor(private auth: Auth, private store: Store<Reducers.State>) {
    this.users$ = store.select(Reducers.friendUsers);
  }

  ngOnInit() {
    const friendSearchInfo = <FriendSearchInfo>{
      search: '',
      friendSearchType: FriendSearchType.Search
    }
    this.store.dispatch(new FriendActions.SearchFriends(friendSearchInfo));
  }

  onNavUser(userName: string) {
    this.store.dispatch(new SharedActions.ResetState());
    this.store.dispatch(new SharedActions.NavUsers(userName));
  }

}
