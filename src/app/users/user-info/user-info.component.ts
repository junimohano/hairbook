import { UserFriend } from '../../shared/models/user-friend';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Auth } from 'app/shared/auth/auth.service';
import { User } from 'app/shared/models/user';

import * as Reducers from '../../shared/reducers';
import * as SharedActions from '../../shared/shared-actions';
import * as UserActions from '../shared/user-actions';

@Component({
  selector: 'hb-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnChanges {

  @Input() user: User;
  @Input() isMe: boolean;

  constructor(public auth: Auth, private store: Store<Reducers.State>) {
  }

  ngOnInit() {

  }

  ngOnChanges() {
  }

  onClickFollowers() {
    this.store.dispatch(new SharedActions.NavFriendsFollowers());
  }

  onClickFollowing() {
    this.store.dispatch(new SharedActions.NavFriendsFollowing());
  }

  onSetUserFriend(user: User) {
    if (user.isFollowing) {
      this.store.dispatch(new UserActions.DelUserFriend(user.userId));
    } else {
      const userFriend = <UserFriend>{
        friendId: user.userId,
        createdUserId: this.auth.userId
      };
      this.store.dispatch(new UserActions.AddUserFriend(userFriend));
    }
  }

}
