import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Auth } from '../../shared/auth/auth.service';

import { Store } from '@ngrx/store';
import * as UserActions from '../shared/user-actions';
import * as SharedActions from '../../shared/shared-actions';
import * as Reducers from '../../shared/reducers';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { Post } from 'app/shared/models/post';
import { PostDetailComponent } from 'app/shared/components/post-detail/post-detail.component';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/shared/models/user';
import { Subscription } from 'rxjs/Subscription';
import { PostSearchInfo } from 'app/shared/models/post-search-info';
import { PostComment } from 'app/shared/models/post-comment';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { EvaluationType } from 'app/shared/models/enums/evaluation-type';

@Component({
  selector: 'hb-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
})
export class UserMainComponent implements OnInit, OnDestroy {

  postSearchInfo$: Observable<PostSearchInfo>;
  posts$: Observable<Post[]>;
  isProgressSpinner$: Observable<boolean>;
  user$: Observable<User>;
  isMe = false;
  activatedRouteSubscription: Subscription;
  userSubscription: Subscription;
  previousSubscription: Subscription;
  nextSubscription: Subscription;

  postCommentSubscription: Subscription;

  postSearchInfo: PostSearchInfo;
  scrollFlag = true;

  constructor(private auth: Auth, private store: Store<Reducers.State>, private activatedRoute: ActivatedRoute, private router: Router) {
    this.postSearchInfo$ = store.select(Reducers.sharedPostSearchInfo);
    this.posts$ = store.select(Reducers.sharedUserPosts);
    this.isProgressSpinner$ = store.select(Reducers.sharedIsProgressSpinner);
    this.user$ = store.select(Reducers.userUser);
  }

  ngOnInit() {
    this.activatedRouteSubscription = this.activatedRoute.params.subscribe(params => {
      const userNameParam = params['userName'];
      this.store.dispatch(new UserActions.GetUser(userNameParam));
      this.postSearchInfo = <PostSearchInfo>{
        search: '',
        isUserPost: true,
        userNameParam: userNameParam
      }
      this.store.dispatch(new SharedActions.SearchPost(this.postSearchInfo));
      // this.id = +params['id']; // (+) converts string 'id' to a number
    });

    this.userSubscription = this.user$.subscribe(user => {
      if (user) {
        this.isMe = user.userName === sessionStorage.getItem('userName');
      }
    });

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
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      if (this.scrollFlag) {
        console.log('bottom');
        if (this.postSearchInfo) {
          this.store.dispatch(new SharedActions.SearchPost(this.postSearchInfo));
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
      this.store.dispatch(new SharedActions.SearchPost(this.postSearchInfo));
    }
  }

  goDetail(post: Post) {
    this.router.navigate(['/users', 'post', post.postId]);
  }

  showMoreComments(post: Post) {
    // this.store.dispatch(new UserActions.GetPostComments(postComment));
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

}
