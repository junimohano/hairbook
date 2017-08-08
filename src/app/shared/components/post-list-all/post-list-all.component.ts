import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Auth } from 'app/shared/auth/auth.service';
import { EvaluationType } from 'app/shared/models/enums/evaluation-type';
import { UploadCategoryType } from 'app/shared/models/enums/upload-category-type';
import { Post } from 'app/shared/models/post';
import { PostComment } from 'app/shared/models/post-comment';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from 'ngx-gallery/lib';

import * as Reducers from '../../../shared/reducers';
import { PostSearchType } from '../../models/enums/post-search-type';
import { PostFavorite } from '../../models/post-favorite';
import { ImagePathPipe } from 'app/shared/pipes/image-path.pipe';

@Component({
  selector: 'hb-post-list-all',
  templateUrl: './post-list-all.component.html',
  styleUrls: ['./post-list-all.component.scss'],
  // changeDetection: ChangeDetectionStrategy.Default
})
export class PostListAllComponent implements OnInit {

  private _posts: Post[];

  get posts(): Post[] {
    return this._posts;
  }

  @Input()
  set posts(posts: Post[]) {
    const imagePathPipe = new ImagePathPipe();

    posts.forEach(post => {
      post.galleryImages = [];
      post.postUploads.forEach(postUpload => {

        const path = imagePathPipe.transform(postUpload.path, null);
        // console.log(path, postUpload.memo);
        post.galleryImages.push(
          {
            small: path,
            medium: path,
            big: path,
            description: '[' + UploadCategoryType[postUpload.uploadCategoryType] + '] - ' + postUpload.memo
          });
      });
    });
    this._posts = posts;
  }

  @Input() postSearchType: PostSearchType;

  @Output() showMoreComments = new EventEmitter<Post>();
  @Output() addPostComment = new EventEmitter<PostComment>();
  @Output() delPostComment = new EventEmitter<number>();
  @Output() addPostEvalution = new EventEmitter<PostEvaluation>();
  @Output() delPostEvalution = new EventEmitter<number>();
  @Output() addPostFavorite = new EventEmitter<PostFavorite>();
  @Output() delPostFavorite = new EventEmitter<number>();
  @Output() clickUser = new EventEmitter<string>();
  @Output() editPost = new EventEmitter<number>();
  @Output() delPost = new EventEmitter<number>();

  @ViewChild('commentBox') commentBox;

  uploadCategories: any[];

  galleryOptions: NgxGalleryOptions[];

  constructor(public auth: Auth, private store: Store<Reducers.State>) {
    this.uploadCategories = Object.keys(UploadCategoryType).filter(String);
  }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '95%',
        height: '600px',
        // fullWidth: true,
        image: true,
        imageSize: NgxGalleryImageSize.Contain,
        imageSwipe: false,
        imageArrows: true,
        imageArrowsAutoHide: false,
        thumbnails: false,
        preview: false,
        previewDescription: true,
        previewSwipe: true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
      },
      // // max-width 400
      // {
      //   breakpoint: 400,
      //   width: '100%',
      //   preview: false
      // }
    ];
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
      this.delPostEvalution.emit(post.postId);
    } else {
      const postEvaluation = <PostEvaluation>{
        evaluationType: EvaluationType.Like,
        postId: post.postId,
        createdUserId: this.auth.userId
      };
      this.addPostEvalution.emit(postEvaluation);
    }
  }

  onSetPostFavorite(post: Post) {
    if (post.isFavorite) {
      this.delPostFavorite.emit(post.postId);
    } else {
      const postFavorite = <PostFavorite>{
        postId: post.postId,
        createdUserId: this.auth.userId
      };
      this.addPostFavorite.emit(postFavorite);
    }
  }

  onClickUser(userName: string) {
    this.clickUser.emit(userName);
  }

  onChangedImage(event, postIndex: number) {
    this.posts[postIndex].currentUploadIndex = event.index;
  }

}
