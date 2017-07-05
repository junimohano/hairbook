import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Post } from 'app/shared/models/post';
import { PostHairMenu } from 'app/shared/models/post-hair-menu';
import { UploadCategoryType } from 'app/shared/models/enums/upload-category-type';
import { PostComment } from 'app/shared/models/post-comment';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { EvaluationType } from 'app/shared/models/enums/evaluation-type';

@Component({
  selector: 'hb-post-list-all',
  templateUrl: './post-list-all.component.html',
  styleUrls: ['./post-list-all.component.scss'],
  // changeDetection: ChangeDetectionStrategy.Default
})
export class PostListAllComponent implements OnInit {

  @Input() posts: Post[];

  @Output() showMoreComments = new EventEmitter<Post>();
  @Output() addPostComment = new EventEmitter<PostComment>();
  @Output() delPostComment = new EventEmitter<number>();
  @Output() addPostEvalution = new EventEmitter<PostEvaluation>();
  @Output() delPostEvalution = new EventEmitter<number>();

  @ViewChild('commentBox') commentBox;

  uploadCategories: any[];
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  userId: number;

  constructor() {
    this.userId = +sessionStorage.getItem('userId');
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
        createdUserId: +sessionStorage.getItem('userId')
      };

      this.addPostComment.emit(postComment);
      post.comment = '';
    }
  }

  onSetPostEvalution(post: Post) {
    const userId = +sessionStorage.getItem('userId');
    if (post.isEvaluation) {
      const postEvaluation = post.postEvaluations.find(x => x.createdUserId === userId);
      this.delPostEvalution.emit(postEvaluation.postEvaluationId);
    } else {
      const postEvaluation = <PostEvaluation>{
        evaluationType: EvaluationType.Like,
        postId: post.postId,
        createdUserId: userId
      };
      this.addPostEvalution.emit(postEvaluation);
    }
  }

}
