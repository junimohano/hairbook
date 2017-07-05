import { Component, OnInit, OnDestroy, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Auth } from '../../shared/auth/auth.service';

import { Store } from '@ngrx/store';
import * as ExplorerActions from '../shared/explorer-actions';
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

@Component({
  selector: 'hb-explorer-main',
  templateUrl: './explorer-main.component.html',
  styleUrls: ['./explorer-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExplorerMainComponent implements OnInit, OnDestroy {

  search$: Observable<string>;
  posts$: Observable<Post[]>;
  isProgressSpinner$: Observable<boolean>;
  previousSubscription: Subscription;
  nextSubscription: Subscription;
  scrollFlag = true;

  constructor(private auth: Auth, private store: Store<Reducers.State>, public dialog: MdDialog, private router: Router) {
    this.search$ = store.select(Reducers.explorerSearch);
    this.posts$ = store.select(Reducers.explorerPosts);
    this.isProgressSpinner$ = store.select(Reducers.sharedIsProgressSpinner);
  }

  ngOnInit() {
    this.store.dispatch(new ExplorerActions.SearchPost());
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
        this.store.dispatch(new ExplorerActions.SearchPost());
      }
      this.scrollFlag = false;
    } else {
      this.scrollFlag = true;
    }
  }

  searchChange(search: string) {
    this.store.dispatch(new ExplorerActions.SearchPost(search));
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
        this.store.dispatch(new ExplorerActions.PreviousUploadIndex(postId));
      });

      this.nextSubscription = dialogRef.componentInstance.next.subscribe((postId: number) => {
        this.store.dispatch(new ExplorerActions.NextUploadIndex(postId));
      });

      // dialogRef.afterClosed().subscribe(result => {
      // this.selectedOption = result;
      // })
    } else {
      this.router.navigate(['/explorers', 'post', post.postId]);
    }

  }

  addPostComment(postComment: PostComment) {
    this.store.dispatch(new ExplorerActions.AddPostComment(postComment));
  }

  delPostComment(postCommentId: number) {
    this.store.dispatch(new ExplorerActions.DelPostComment(postCommentId));
  }

  addPostEvalution(postEvaluation: PostEvaluation) {
    this.store.dispatch(new ExplorerActions.AddPostEvaluation(postEvaluation));
  }

  delPostEvalution(postEvaluationId: number) {
    this.store.dispatch(new ExplorerActions.DelPostEvaluation(postEvaluationId));
  }

}
