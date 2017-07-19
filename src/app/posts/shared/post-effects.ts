import { PostUploadInfoType } from './post-upload-info-type';
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
            postUploadInfo: postInfo.postUploadInfo
          }
          return new PostActions.SetPostUpload(postInfoTemp);
        })
        .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    });

  @Effect() editPostEffect$ = this.actions$.ofType(PostActions.EDIT_POST)
    .map((action: PostActions.EditPost) => action.payload)
    .withLatestFrom(this.store)
    .switchMap(([postInfo, state]) => {
      this.store.dispatch(new SharedActions.SetProgressBar(true));
      return this.postService.editPost(postInfo.post)
        .map((post: Post) => {
          console.log(PostActions.EDIT_POST);
          state.post.postUploadIndex = 0;
          const postInfoTemp = <PostInfo>{
            post: post,
            postUploadInfo: postInfo.postUploadInfo
          }
          return new PostActions.SetPostUpload(postInfoTemp);
        })
        .catch((res: Response) => of(new SharedActions.SetSnackBar(res)))
    });

  @Effect() setPostUploadEffect$ = this.actions$.ofType(PostActions.SET_POST_UPLOAD)
    .map((action: PostActions.SetPostUpload) => action.payload)
    .withLatestFrom(this.store)
    .switchMap(([postInfo, state]) => {
      if (state.post.postUploadIndex < postInfo.postUploadInfo.length) {
        console.log(PostActions.SET_POST_UPLOAD, state.post.postUploadIndex);
        const postUploadInfo = postInfo.postUploadInfo[state.post.postUploadIndex];

        switch (postUploadInfo.postUploadInfoType) {
          case PostUploadInfoType.Add:
            return this.postService.addUpload(postInfo.post.postId, postUploadInfo, this.auth.userId)
              .map(x => {
                state.post.postUploadIndex++;
                return new PostActions.SetPostUpload(postInfo);
              })
              .catch((res: Response) => {
                return of(new SharedActions.SetSnackBar(res));
              });

          case PostUploadInfoType.Delete:
            return this.postService.delUpload(postUploadInfo.postUploadId)
              .map(x => {
                state.post.postUploadIndex++;
                return new PostActions.SetPostUpload(postInfo);
              })
              .catch((res: Response) => {
                return of(new SharedActions.SetSnackBar(res));
              });

          case PostUploadInfoType.Update:
            return this.postService.updateUpload(postUploadInfo.postUploadId, postUploadInfo, this.auth.userId)
              .map(x => {
                state.post.postUploadIndex++;
                return new PostActions.SetPostUpload(postInfo);
              })
              .catch((res: Response) => {
                return of(new SharedActions.SetSnackBar(res));
              });
        }

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
