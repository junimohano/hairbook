import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom'
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as Reducers from '../../shared/reducers';
import * as PostActions from './post-actions';
import * as SharedActions from '../../shared/shared-actions';
import { PostService } from './post.service';
import { User } from 'app/shared/models/user';
import { Token } from 'app/shared/models/token';
import { UserSecret } from 'app/logins/shared/user-secret';
import { Auth } from 'app/shared/auth/auth.service';
import { Router } from '@angular/router'
import { go, replace, search, show, back, forward } from '@ngrx/router-store';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostEffects {

  @Effect() getHairMenusEffect$ = this.actions$.ofType(PostActions.GET_HAIR_MENUS)
    .switchMap(() =>
      this.postService.getHairMenus()
        .map(x => new PostActions.GetHairMenusSuccess(x))
        .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() getHairTypesEffect$ = this.actions$.ofType(PostActions.GET_HAIR_TYPES)
    .switchMap(() =>
      this.postService.getHairTypes()
        .map(x => new PostActions.GetHairTypesSuccess(x))
        .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() addPostEffect$ = this.actions$.ofType(PostActions.ADD_POST)
    .switchMap((action: PostActions.AddPost) =>
      this.postService.addPost(action.payload)
        .map(x => go(['/users', this.auth.userName]))
        .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() editPostEffect$ = this.actions$.ofType(PostActions.EDIT_POST)
    .switchMap((action: PostActions.EditPost) =>
      this.postService.editPost(action.payload)
        .map(x => go(['/users', this.auth.userName]))
        .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() getCustomersEffect$ = this.actions$.ofType(PostActions.GET_CUSTOMERS)
    .switchMap((action: PostActions.GetCustomers) =>
      this.postService.getCustomers(action.payload)
        .map(x => new PostActions.GetCustomersSuccess(x))
        .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  constructor(private actions$: Actions,
    private auth: Auth,
    private postService: PostService,
    private store: Store<Reducers.State>,
    private router: Router) {

  }
}
