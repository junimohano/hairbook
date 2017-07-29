import { PostSearchType } from '../../shared/models/enums/post-search-type';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'app/shared/models/post';
import { PostComment } from 'app/shared/models/post-comment';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { PostSearchInfo } from 'app/shared/models/post-search-info';
import { User } from 'app/shared/models/user';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Auth } from '../../shared/auth/auth.service';
import * as Reducers from '../../shared/reducers';
import * as SharedActions from '../../shared/shared-actions';
import * as UserActions from '../shared/user-actions';

@Component({
  selector: 'hb-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UserMainComponent implements OnInit, OnDestroy, AfterViewInit {

  postSearchInfo$: Observable<PostSearchInfo>;
  posts$: Observable<Post[]>;
  isProgressSpinner$: Observable<boolean>;
  user$: Observable<User>;
  sharedUsersTabIndex$: Observable<number>;
  postSearchType$: Observable<PostSearchType>;
  isMe = false;

  postSearchInfoSubscription: Subscription;
  activatedRouteSubscription: Subscription;
  userSubscription: Subscription;
  previousSubscription: Subscription;
  nextSubscription: Subscription;

  postCommentSubscription: Subscription;

  postSearchInfo: PostSearchInfo;
  search: string;
  scrollFlag = true;

  constructor(private auth: Auth, private store: Store<Reducers.State>, private activatedRoute: ActivatedRoute, private router: Router, private cd: ChangeDetectorRef) {
    this.postSearchInfo$ = store.select(Reducers.sharedPostSearchInfo);
    this.posts$ = store.select(Reducers.sharedPosts);
    this.isProgressSpinner$ = store.select(Reducers.sharedIsProgressSpinner);
    this.user$ = store.select(Reducers.userUser);
    this.sharedUsersTabIndex$ = store.select(Reducers.sharedUsersTabIndex);
    this.postSearchType$ = store.select(Reducers.sharedPostSearchType);

    this.postSearchInfoSubscription = this.postSearchInfo$.subscribe(x => {
      if (x) {
        this.search = x.search;
      }
    });

    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(params => {
      const userNameParam = params['userName'];
      this.store.dispatch(new UserActions.GetUser(userNameParam));
      this.postSearchInfo = <PostSearchInfo>{
        search: this.search,
        postSearchType: PostSearchType.Users,
        userNameParam: userNameParam
      }
      this.store.dispatch(new SharedActions.SearchPosts(this.postSearchInfo));
    });

    this.userSubscription = this.user$.subscribe(user => {
      if (user) {
        this.isMe = user.userName === this.auth.userName;
      }
    });
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    // location.reload();
    // setTimeout(() => {
    //   console.log('done');
    //   this.cd.markForCheck();
    // }, 5000);
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
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

  searchChange(searchString: string) {
    if (this.postSearchInfo) {
      this.postSearchInfo.search = searchString;
      this.store.dispatch(new SharedActions.SearchPosts(this.postSearchInfo));
    }
  }

  goDetail(post: Post) {
    this.store.dispatch(new SharedActions.NavUsersPost(String(post.postId)));
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

  onSelectedIndexChange(event) {
    this.store.dispatch(new SharedActions.SetUsersTabIndex(event));
  }

  editPost(postId: number) {
    this.store.dispatch(new SharedActions.NavPosts(String(postId)));
  }

  delPost(postId: number) {
    this.store.dispatch(new SharedActions.DelPost(postId));
  }

}
