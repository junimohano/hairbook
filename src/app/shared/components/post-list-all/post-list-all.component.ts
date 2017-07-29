import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Auth } from 'app/shared/auth/auth.service';
import { EvaluationType } from 'app/shared/models/enums/evaluation-type';
import { UploadCategoryType } from 'app/shared/models/enums/upload-category-type';
import { Post } from 'app/shared/models/post';
import { PostComment } from 'app/shared/models/post-comment';
import { PostEvaluation } from 'app/shared/models/post-evaluation';

import * as Reducers from '../../../shared/reducers';
import { PostSearchType } from '../../models/enums/post-search-type';

@Component({
  selector: 'hb-post-list-all',
  templateUrl: './post-list-all.component.html',
  styleUrls: ['./post-list-all.component.scss'],
  // changeDetection: ChangeDetectionStrategy.Default
})
export class PostListAllComponent implements OnInit {

  @Input() posts: Post[];
  @Input() postSearchType: PostSearchType;

  @Output() showMoreComments = new EventEmitter<Post>();
  @Output() addPostComment = new EventEmitter<PostComment>();
  @Output() delPostComment = new EventEmitter<number>();
  @Output() addPostEvalution = new EventEmitter<PostEvaluation>();
  @Output() delPostEvalution = new EventEmitter<number>();
  @Output() clickUser = new EventEmitter<string>();
  @Output() editPost = new EventEmitter<number>();
  @Output() delPost = new EventEmitter<number>();

  @ViewChild('commentBox') commentBox;

  uploadCategories: any[];
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  constructor(public auth: Auth, private store: Store<Reducers.State>) {
    this.uploadCategories = Object.keys(UploadCategoryType).filter(String);
  }

  ngOnInit() {

  }

  onPrevious(postId: Number) {
    const post = this.posts.find(x => x.postId === postId);
    if (post.currentUploadIndex > 0) {
      post.currentUploadIndex--;
    }
  }

  onNext(postId: Number) {
    const post = this.posts.find(x => x.postId === postId);
    if (post.currentUploadIndex < post.postUploads.length - 1) {
      post.currentUploadIndex++;
    }
  }

  onSwipe(postId: Number, action = this.SWIPE_ACTION.RIGHT) {
    if (action === this.SWIPE_ACTION.LEFT) {
      this.onNext(postId);
    } else {
      this.onPrevious(postId);
    }
  }

  onGoToCommentBox() {
    this.commentBox.nativeElement.focus();
  }

  onAddPostComment(post: Post) {
    if (post.comment.length > 0) {
      const postComment = <PostComment>{
        postId: post.postId,
        comment: post.comment,
        createdUserId: this.auth.userId
      };

      this.addPostComment.emit(postComment);
      post.comment = '';
    }
  }

  onSetPostEvalution(post: Post) {
    if (post.isEvaluation) {
      const postEvaluation = post.postEvaluations.find(x => x.createdUserId === this.auth.userId);
      this.delPostEvalution.emit(postEvaluation.postEvaluationId);
    } else {
      const postEvaluation = <PostEvaluation>{
        evaluationType: EvaluationType.Like,
        postId: post.postId,
        createdUserId: this.auth.userId
      };
      this.addPostEvalution.emit(postEvaluation);
    }
  }

  onClickUser(userName: string) {
    this.clickUser.emit(userName);
  }

}
