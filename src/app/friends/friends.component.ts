import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs/Rx';

import { UserFriend } from '../shared/models/user-friend';
import * as Reducers from '../shared/reducers';
import * as FriendActions from './shared/friend-actions';
import * as SharedActions from '../shared/shared-actions';
import { FriendSearchInfo } from './shared/friend-search-info';
import { FriendSearchType } from './shared/friend-search-type';

@Component({
  selector: 'hb-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FriendsComponent implements OnInit, OnDestroy {

  isProgressSpinner$: Observable<boolean>;

  scrollFlag = true;
  friendSearchInfoSubscription: Subscription;
  friendSearchInfo: FriendSearchInfo;

  constructor(private store: Store<Reducers.State>) {
    this.isProgressSpinner$ = store.select(Reducers.sharedIsProgressSpinner);

    this.friendSearchInfoSubscription = store.select(Reducers.friendFriendSearchInfo).subscribe(x => {
      this.friendSearchInfo = x;
    });
  }

  ngOnInit() {
    this.store.dispatch(new SharedActions.SetIsPreventRefreshingPosts(true));
  }

  public ngOnDestroy(): void {
    this.friendSearchInfoSubscription.unsubscribe();
  }

  searchChange(searchString: string) {
    if (this.friendSearchInfo) {
      const friendSearchInfo = <FriendSearchInfo>{
        friendSearchType: this.friendSearchInfo.friendSearchType,
        search: searchString
      };
      this.store.dispatch(new FriendActions.SearchFriends(friendSearchInfo));
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      if (this.scrollFlag) {
        console.log('bottom');
        if (this.friendSearchInfo) {
          this.store.dispatch(new FriendActions.SearchFriends(this.friendSearchInfo));
        }
      }
      this.scrollFlag = false;
    } else {
      this.scrollFlag = true;
    }
  }

}
