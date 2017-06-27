import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom'
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';

import { UserService } from './user.service';
import * as UserActions from './user-actions';
import * as SharedActions from '../../shared/shared-actions';
import * as Reducers from '../../shared/reducers';
import { User } from 'app/shared/models/user';
import { of } from 'rxjs/observable/of';
import { go, back } from '@ngrx/router-store';
import { Post } from 'app/shared/models/post';

@Injectable()
export class UserEffects {

  @Effect() specialEffect$ = this.actions$.ofType(UserActions.SEARCH_POST)
    .debounceTime(100)
    .withLatestFrom(this.store, (payload, state) => {
      if (state.user.posts.length === 0) {
        this.store.dispatch(new SharedActions.SetProgressBar(true));
      } else {
        this.store.dispatch(new SharedActions.SetProgressSpinner(true));
      }
      return state.user.isLast;
    })
    .filter(x => !x)
    .filter(() => sessionStorage.getItem('userId') !== undefined)
    .withLatestFrom(this.store, (payload, state) => ({ currentPostCount: state.user.currentPostCount, postSearchInfo: state.user.postSearchInfo }))
    .switchMap((results) => this.userService.getPosts(results.currentPostCount, String(sessionStorage.getItem('userName')), results.postSearchInfo.userNameParam, results.postSearchInfo.search)
      .mergeMap((posts: Post[]) => {
        return [new UserActions.SuccessPost(posts), new SharedActions.SetProgressBar(false), new SharedActions.SetProgressSpinner(false)];
      })
      .catch((res: Response) => of(new SharedActions.SetSnackBar(String(res.text()))))
    )

  @Effect() getUserEffect$ = this.actions$.ofType(UserActions.GET_USER)
    .map((action: UserActions.GetUser) => action.payload)
    .switchMap((userName: string) => this.userService.getUser(userName)
      .map((user: User) => new UserActions.GetUserSuccess(user))
      .catch((res: Response) => of(new SharedActions.SetSnackBar(String(res.text())))))

  @Effect() editUserEffect$ = this.actions$.ofType(UserActions.EDIT_USER)
    .map((action: UserActions.EditUser) => action.payload)
    .switchMap((user: User) => this.userService.putUser(user)
      .map(x => back())
      .catch((res: Response) => of(new SharedActions.SetSnackBar(String(res.text()))))
    );

  constructor(private actions$: Actions, private userService: UserService, private store: Store<Reducers.State>) {

  }
}
