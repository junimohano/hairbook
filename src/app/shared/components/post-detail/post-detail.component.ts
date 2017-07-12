import { Component, OnInit, Inject, Input, Output, EventEmitter, OnDestroy, Optional, ViewChild } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { Post } from 'app/shared/models/post';
import { PostHairMenu } from 'app/shared/models/post-hair-menu';
import { Store } from '@ngrx/store';
import * as UserActions from '../../../users/shared/user-actions';
import * as SharedActions from '../../shared-actions';
import * as Reducers from '../../../shared/reducers';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { UploadCategoryType } from 'app/shared/models/enums/upload-category-type';
import { PostComment } from 'app/shared/models/post-comment';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { EvaluationType } from 'app/shared/models/enums/evaluation-type';
import { Auth } from 'app/shared/auth/auth.service';

@Component({
  selector: 'hb-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  post: Post;
  postMenuColor: PostHairMenu;
  postMenuPerm: PostHairMenu;

  @ViewChild('commentBox') commentBox;

  uploadCategories: any[];
  postSubscription: Subscription;
  postCommentSubscription: Subscription;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  comment: string;

  constructor( @Optional() @Inject(MD_DIALOG_DATA) public data: any, private auth: Auth, private store: Store<Reducers.State>, private activedRoute: ActivatedRoute) {

    this.uploadCategories = Object.keys(UploadCategoryType).filter(String);
    // console.log(this.uploadCategories);

    if (data) {
      this.setPostData(data);
    } else {
      activedRoute.params.subscribe(params => {
        console.log(params);

        const postId = +params['postId'];
        this.postSubscription = this.store.select(Reducers.sharedSelectedPost).subscribe(post => {
          if (post) {
            this.setPostData(post);
          }
        });
        this.store.dispatch(new SharedActions.GetPost(postId));
      })
    }
  }

  setPostData(post: Post) {
    console.log(post);
    this.post = post;
    this.postMenuColor = post.postHairMenus.find(x => x.hairMenuId === 2);
    this.postMenuPerm = post.postHairMenus.find(x => x.hairMenuId === 3);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
    if (this.postCommentSubscription) {
      this.postCommentSubscription.unsubscribe();
    }
  }

  onPrevious() {
    if (this.postSubscription) {
      if (this.post.currentUploadIndex > 0) {
        this.post.currentUploadIndex--;
      }
    } else {
      this.store.dispatch(new SharedActions.PreviousUploadIndex(this.post.postId));
    }
  }

  onNext() {
    if (this.postSubscription) {
      if (this.post.currentUploadIndex < this.post.postUploads.length - 1) {
        this.post.currentUploadIndex++;
      }
    } else {
      this.store.dispatch(new SharedActions.NextUploadIndex(this.post.postId));
    }
  }

  onSwipe(action = this.SWIPE_ACTION.RIGHT) {
    if (action === this.SWIPE_ACTION.LEFT) {
      this.onNext();
    } else {
      this.onPrevious();
    }
  }


  onGoToCommentBox() {
    this.commentBox.nativeElement.focus();
  }

  onShowMoreComments(post: Post) {
    this.store.dispatch(new SharedActions.GetPostComment(post));
  }

  onAddPostComment(comment: string) {
    if (comment.length > 0) {
      const postComment = <PostComment>{
        postId: this.post.postId,
        comment: comment,
        createdUserId: this.auth.userId
      };
      this.store.dispatch(new SharedActions.AddPostComment(postComment));
      this.comment = '';
    }
  }

  onDelPostComment(postCommentId) {
    this.store.dispatch(new SharedActions.DelPostComment(postCommentId));
  }


  onSetPostEvalution() {
    if (this.post.isEvaluation) {
      const postEvaluation = this.post.postEvaluations.find(x => x.createdUserId === this.auth.userId);
      this.store.dispatch(new SharedActions.DelPostEvaluation(postEvaluation.postEvaluationId));
    } else {
      const postEvaluation = <PostEvaluation>{
        evaluationType: EvaluationType.Like,
        postId: this.post.postId,
        createdUserId: this.auth.userId
      };
      this.store.dispatch(new SharedActions.AddPostEvaluation(postEvaluation));
    }
  }

}
