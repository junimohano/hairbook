import { EvaluationType } from '../../models/enums/evaluation-type';
import { Component, EventEmitter, Inject, OnDestroy, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Auth } from 'app/shared/auth/auth.service';
import { UploadCategoryType } from 'app/shared/models/enums/upload-category-type';
import { Post } from 'app/shared/models/post';
import { PostComment } from 'app/shared/models/post-comment';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { ImagePathPipe } from 'app/shared/pipes/image-path.pipe';
import { NgxGalleryAnimation, NgxGalleryImageSize, NgxGalleryOptions } from 'ngx-gallery/lib';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import * as Reducers from '../../../shared/reducers';
import { PostSearchType } from '../../models/enums/post-search-type';
import { PostFavorite } from '../../models/post-favorite';
import * as SharedActions from '../../shared-actions';

@Component({
  selector: 'hb-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  post: Post;
  postSearchType$: Observable<PostSearchType>;

  @ViewChild('commentBox') commentBox;
  @Output() closeDialog = new EventEmitter();

  uploadCategories: any[];
  postSubscription: Subscription;
  postCommentSubscription: Subscription;
  activatedRouteSubscription: Subscription;
  comment: string;

  galleryOptions: NgxGalleryOptions[];

  constructor( @Optional() @Inject(MD_DIALOG_DATA) public data: any, public auth: Auth, private store: Store<Reducers.State>, private activatedRoute: ActivatedRoute) {
    this.postSearchType$ = store.select(Reducers.sharedPostSearchType);

    this.uploadCategories = Object.keys(UploadCategoryType).filter(String);

    if (data) {
      this.post = data;
      this.setPostData();
    } else {
      this.activatedRouteSubscription = activatedRoute.params.subscribe(params => {
        console.log(params);

        const postId = +params['postId'];
        this.postSubscription = this.store.select(Reducers.sharedSelectedPost).subscribe(post => {
          if (post) {
            this.post = post;
            this.setPostData();
          } else {
            this.store.dispatch(new SharedActions.GetPost(postId));
          }
        });
      });
    }
  }

  setPostData() {
    const imagePathPipe = new ImagePathPipe();

    this.post.galleryImages = [];
    this.post.postUploads.forEach(postUpload => {

      const path = imagePathPipe.transform(postUpload.path, null);
      // console.log(path, postUpload.memo);
      this.post.galleryImages.push(
        {
          small: path,
          medium: path,
          big: path,
          description: '[' + UploadCategoryType[postUpload.uploadCategoryType] + '] - ' + postUpload.memo
        });
    });
  }

  ngOnInit() {
    this.store.dispatch(new SharedActions.SetIsPreventRefreshingPosts(true));

    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        image: true,
        imageSize: NgxGalleryImageSize.Cover,
        imageSwipe: false,
        imageArrows: true,
        imageArrowsAutoHide: false,
        thumbnails: false,
        preview: true,
        previewDescription: true,
        previewSwipe: true,
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // // max-width 800
      // {
      //   breakpoint: 800,
      //   width: '100%',
      //   height: '600px',
      // },
      // // max-width 400
      // {
      //   breakpoint: 400,
      //   preview: false
      // }
    ];
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
    if (this.postCommentSubscription) {
      this.postCommentSubscription.unsubscribe();
    }
    if (this.activatedRouteSubscription) {
      this.activatedRouteSubscription.unsubscribe();
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

  onSetPostEvalution(post: Post) {
    if (post.isEvaluation) {
      this.store.dispatch(new SharedActions.DelPostEvaluation(post.postId));
    } else {
      const postEvaluation = <PostEvaluation>{
        evaluationType: EvaluationType.Like,
        postId: post.postId,
        createdUserId: this.auth.userId
      };
      this.store.dispatch(new SharedActions.AddPostEvaluation(postEvaluation));
    }
  }

  onSetPostFavorite(post: Post) {
    if (post.isFavorite) {
      this.store.dispatch(new SharedActions.DelPostFavorite(post.postId));
    } else {
      const postFavorite = <PostFavorite>{
        postId: post.postId,
        createdUserId: this.auth.userId
      };
      this.store.dispatch(new SharedActions.AddPostFavorite(postFavorite));
    }
  }

  editPost() {
    this.store.dispatch(new SharedActions.NavPosts(String(this.post.postId)));
    this.closeDialog.emit();
  }

  deletePost() {
    this.store.dispatch(new SharedActions.DelPost(this.post.postId));
    this.closeDialog.emit();
  }

  onClickUser(userName: string) {
    this.store.dispatch(new SharedActions.NavUsers(userName));
  }

  onChangedImage(event) {
    this.post.currentUploadIndex = event.index;
  }

}
