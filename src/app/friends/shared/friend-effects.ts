import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FriendSearchInfo } from 'app/friends/shared/friend-search-info';
import { Auth } from 'app/shared/auth/auth.service';
import { of } from 'rxjs/observable/of';

import * as Reducers from '../../shared/reducers';
import * as SharedActions from '../../shared/shared-actions';
import * as FriendActions from './friend-actions';
import { FriendService } from './friend.service';

@Injectable()
export class FriendEffects {

  @Effect() searchFriendsEffect$ = this.actions$.ofType(FriendActions.SEARCH_FRIENDS)
    .map((action: FriendActions.SearchFriends) => action.payload)
    .debounceTime(50)
    .withLatestFrom(this.store, (payload, state) => {
      const totalFriends = state.friend.userFriends.length;
      if (totalFriends === 0) {
        this.store.dispatch(new SharedActions.SetProgressBar(true));
      } else {
        this.store.dispatch(new SharedActions.SetProgressSpinner(true));
      }
      return ({ currentTotalUserFriends: totalFriends, friendSearchInfo: state.friend.friendSearchInfo })
    })
    .switchMap((results) => this.friendService.getFriends(results.currentTotalUserFriends, results.friendSearchInfo.friendSearchType, this.auth.userId, results.friendSearchInfo.search)
      .map(userFriends => {
        console.log(FriendActions.SEARCH_FRIENDS, userFriends);
        this.store.dispatch(new SharedActions.SetProgressBar(false));
        return new FriendActions.SearchFriendsSuccess(userFriends);
      })
      .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  constructor(private actions$: Actions,
    private auth: Auth,
    private friendService: FriendService,
    private store: Store<Reducers.State>,
    private router: Router) {

  }
}
