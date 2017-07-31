import { PostSearchType } from '../../shared/models/enums/post-search-type';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PostComment } from 'app/shared/models/post-comment';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { PostFavorite } from 'app/shared/models/post-favorite';
import { PostSearchInfo } from 'app/shared/models/post-search-info';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Auth } from '../../shared/auth/auth.service';
import { Post } from '../../shared/models/post';
import * as Reducers from '../../shared/reducers';
import * as SharedActions from '../../shared/shared-actions';

@Component({
  selector: 'hb-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExplorerComponent implements OnInit, OnDestroy {

  postSearchInfo$: Observable<PostSearchInfo>;
  posts$: Observable<Post[]>;
  isProgressSpinner$: Observable<boolean>;
  sharedExplorersTabIndex$: Observable<number>;
  postSearchType$: Observable<PostSearchType>;

  postSearchInfoSubscription: Subscription;
  previousSubscription: Subscription;
  nextSubscription: Subscription;

  postSearchInfo: PostSearchInfo;
  scrollFlag = true;

  constructor(private auth: Auth, private store: Store<Reducers.State>, public dialog: MdDialog, private router: Router) {
    this.postSearchInfo$ = store.select(Reducers.sharedPostSearchInfo);
    this.posts$ = store.select(Reducers.sharedPosts);
    this.isProgressSpinner$ = store.select(Reducers.sharedIsProgressSpinner);
    this.sharedExplorersTabIndex$ = store.select(Reducers.sharedExplorersTabIndex);
    this.postSearchType$ = store.select(Reducers.sharedPostSearchType);

    this.postSearchInfoSubscription = this.postSearchInfo$.subscribe(x => {
      if (x) {
        this.postSearchInfo = <PostSearchInfo>{
          search: x.search,
          userNameParam: x.userNameParam,
          postSearchType: x.postSearchType === PostSearchType.Users ? PostSearchType.ExplorersFollowingOnly : x.postSearchType
        }
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new SharedActions.SearchPosts(this.postSearchInfo));
  }

  ngOnDestroy(): void {
    if (this.previousSubscription) {
      this.previousSubscription.unsubscribe();
    }
    if (this.nextSubscription) {
      this.nextSubscription.unsubscribe();
    }
    this.postSearchInfoSubscription.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      if (this.scrollFlag) {
        console.log('bottom');
        if (this.postSearchInfo) {
          this.store.dispatch(new SharedActions.SearchPosts(this.postSearchInfo));
        }
      }
      this.scrollFlag = false;
    } else {
      this.scrollFlag = true;
    }
  }

  searchChange(search: string) {
    if (this.postSearchInfo) {
      this.postSearchInfo.search = search;
      this.store.dispatch(new SharedActions.SearchPosts(this.postSearchInfo));
    }
  }

  goDetail(post: Post) {
    this.store.dispatch(new SharedActions.NavExplorersPost(String(post.postId)));
  }

  showMoreComments(post: Post) {
    this.store.dispatch(new SharedActions.GetPostComment(post));
  }

  addPostComment(postComment: PostComment) {
    this.store.dispatch(new SharedActions.AddPostComment(postComment));
  }

  delPostComment(postCommentId: number) {
    this.store.dispatch(new SharedActions.DelPostComment(postCommentId));
  }

  addPostEvalution(postEvaluation: PostEvaluation) {
    this.store.dispatch(new SharedActions.AddPostEvaluation(postEvaluation));
  }

  delPostEvalution(postEvaluationId: number) {
    this.store.dispatch(new SharedActions.DelPostEvaluation(postEvaluationId));
  }

  addPostFavorite(postFavorite: PostFavorite) {
    this.store.dispatch(new SharedActions.AddPostFavorite(postFavorite));
  }

  delPostFavorite(postFavoriteId: number) {
    this.store.dispatch(new SharedActions.DelPostFavorite(postFavoriteId));
  }

  clickUser(userName: string) {
    this.store.dispatch(new SharedActions.NavUsers(userName));
  }

  onSelectedIndexChange(event) {
    this.store.dispatch(new SharedActions.SetExplorersTabIndex(event));
  }

  onChangePostSearchType(event) {
    console.log('Post Search Type : ', event.value);
    this.postSearchInfo.postSearchType = event.value;
    this.store.dispatch(new SharedActions.SearchPosts(this.postSearchInfo));
  }

  editPost(postId: number) {
    this.store.dispatch(new SharedActions.NavPosts(String(postId)));
  }

  delPost(postId: number) {
    this.store.dispatch(new SharedActions.DelPost(postId));
  }

}
