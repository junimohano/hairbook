import { Component, OnInit, OnDestroy, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Auth } from '../../shared/auth/auth.service';

import { Store } from '@ngrx/store';
import * as SharedActions from '../../shared/shared-actions';
import * as Reducers from '../../shared/reducers';
import { Observable } from 'rxjs/Observable';
import { MdDialog } from '@angular/material';
import { Post } from '../../shared/models/post';
import { PostDetailComponent } from '../../shared/components/post-detail/post-detail.component';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { EvaluationType } from 'app/shared/models/enums/evaluation-type';
import { PostComment } from 'app/shared/models/post-comment';
import { PostSearchInfo } from 'app/shared/models/post-search-info';

@Component({
  selector: 'hb-explorer-main',
  templateUrl: './explorer-main.component.html',
  styleUrls: ['./explorer-main.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExplorerMainComponent implements OnInit, OnDestroy {

  postSearchInfo$: Observable<PostSearchInfo>;
  posts$: Observable<Post[]>;
  isProgressSpinner$: Observable<boolean>;
  previousSubscription: Subscription;
  nextSubscription: Subscription;

  postSearchInfo: PostSearchInfo;
  scrollFlag = true;

  constructor(private auth: Auth, private store: Store<Reducers.State>, public dialog: MdDialog, private router: Router) {
    this.postSearchInfo$ = store.select(Reducers.sharedPostSearchInfo);
    this.posts$ = store.select(Reducers.sharedExplorerPosts);
    this.isProgressSpinner$ = store.select(Reducers.sharedIsProgressSpinner);
  }

  ngOnInit() {
    this.postSearchInfo = <PostSearchInfo>{
      search: '',
      isUserPost: false
    }
    this.store.dispatch(new SharedActions.SearchPost(this.postSearchInfo));
  }

  ngOnDestroy(): void {
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

  searchChange(search: string) {
    if (this.postSearchInfo) {
      this.postSearchInfo.search = search;
      this.store.dispatch(new SharedActions.SearchPost(this.postSearchInfo));
    }
  }

  openDetail(post: Post) {

    if (window.outerWidth > 600) {
      const height = window.outerHeight > 768 ? 768 : window.outerHeight;
      const width = window.outerWidth > 1024 ? 1024 : window.outerWidth;

      const dialogRef = this.dialog.open(PostDetailComponent, {
        height: `${height}px`,
        width: `${width}px`,
        data: post
      });

      // dialogRef.updateSize(width + 'px', height + 'px');
      // dialogRef.updatePosition({ top: '50px', left: '50px' });

      this.previousSubscription = dialogRef.componentInstance.previous.subscribe((postId: number) => {
        this.store.dispatch(new SharedActions.PreviousUploadIndex(postId));
      });

      this.nextSubscription = dialogRef.componentInstance.next.subscribe((postId: number) => {
        this.store.dispatch(new SharedActions.NextUploadIndex(postId));
      });

      // dialogRef.afterClosed().subscribe(result => {
      // this.selectedOption = result;
      // })
    } else {
      this.router.navigate(['/explorers', 'post', post.postId]);
    }

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
