import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { replace } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Rx';

import { Auth } from '../../shared/auth/auth.service';
import { Post } from '../../shared/models/post';
import { PostInfo } from '../../shared/models/post-info';
import * as Reducers from '../../shared/reducers';
import * as SharedActions from '../../shared/shared-actions';
import { SharedService } from '../../shared/shared.service';
import * as PostActions from './post-actions';
import { AddPost, AddPostUpload, EditPost, GetCustomers } from './post-actions';
import { PostService } from './post.service';

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
    .map((action: PostActions.AddPost) => action.payload)
    .withLatestFrom(this.store)
    .switchMap(([postInfo, state]) => {
      this.store.dispatch(new SharedActions.SetProgressBar(true));
      return this.postService.addPost(postInfo.post)
        .map((post: Post) => {
          console.log(PostActions.ADD_POST);
          state.post.postUploadIndex = 0;
          const postInfoTemp = <PostInfo>{
            post: post,
            postUploads: postInfo.postUploads
          }
          return new PostActions.AddPostUpload(postInfoTemp);
        })
        .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    });

  @Effect() editPostEffect$ = this.actions$.ofType(PostActions.EDIT_POST)
    .switchMap((action: PostActions.EditPost) =>
      this.postService.editPost(action.payload.post)
        .map(x => new PostActions.GoUserPage())
        .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  @Effect() addPostUploadEffect$ = this.actions$.ofType(PostActions.ADD_POST_UPLOAD)
    .map((action: PostActions.AddPostUpload) => action.payload)
    .withLatestFrom(this.store)
    .switchMap(([postInfo, state]) => {
      if (state.post.postUploadIndex < postInfo.postUploads.length) {
        console.log('hahaha', state.post.postUploadIndex);

        return this.postService.addUpload(postInfo.post.postId, postInfo.postUploads[state.post.postUploadIndex])
          .map(x => {
            state.post.postUploadIndex++;
            return new PostActions.AddPostUpload(postInfo);
          })
          .catch((res: Response) => {
            return of(new SharedActions.SetSnackBar(res));
          });
      } else {
        this.store.dispatch(new SharedActions.SetProgressBar(false));
        this.store.dispatch(new PostActions.GoUserPage());
        return Observable.empty();
      }
    });

  @Effect() goUserPageEffect$ = this.actions$.ofType(PostActions.GO_USER_PAGE)
    // .map(() => go(['/users', this.auth.userName]));
    .map(() => replace(['/users', this.auth.userName]));

  @Effect() getCustomersEffect$ = this.actions$.ofType(PostActions.GET_CUSTOMERS)
    .switchMap((action: PostActions.GetCustomers) =>
      this.postService.getCustomers(action.payload)
        .map(x => new PostActions.GetCustomersSuccess(x))
        .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    );

  constructor(private actions$: Actions,
    private auth: Auth,
    private postService: PostService,
    private sharedService: SharedService,
    private store: Store<Reducers.State>,
    private router: Router) {
  }

}
