import { User } from '../../shared/models/user';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { Auth } from '../../shared/auth/auth.service';
import { UserFriend } from '../../shared/models/user-friend';
import * as Reducers from '../../shared/reducers';
import * as FriendActions from '../shared/friend-actions';
import * as SharedActions from '../../shared/shared-actions';
import { FriendSearchInfo } from '../shared/friend-search-info';
import { FriendSearchType } from '../shared/friend-search-type';

@Component({
  selector: 'hb-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FollowersComponent implements OnInit {

  // userFriends$: Observable<UserFriend[]>;
  users$: Observable<User[]>;

  constructor(private auth: Auth, private store: Store<Reducers.State>) {
    // this.userFriends$ = store.select(Reducers.friendUserFriends);
    this.users$ = store.select(Reducers.friendUsers);
  }

  ngOnInit() {
    const friendSearchInfo = <FriendSearchInfo>{
      search: '',
      friendSearchType: FriendSearchType.Followers
    }
    this.store.dispatch(new FriendActions.SearchFriends(friendSearchInfo));
    this.store.dispatch(new SharedActions.SetIsPreventRefreshingPosts(true));
  }

  onNavUser(userName: string) {
    this.store.dispatch(new SharedActions.ResetState());
    this.store.dispatch(new SharedActions.NavUsers(userName));
  }
}
