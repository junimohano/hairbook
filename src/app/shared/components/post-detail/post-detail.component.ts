import { Component, OnInit, Inject, Input, Output, EventEmitter, OnDestroy, Optional } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { Post } from 'app/shared/models/post';
import { PostHairMenu } from 'app/shared/models/post-hair-menu';
import { Store } from '@ngrx/store';
import * as UserActions from '../../../users/shared/user-actions';
import * as Reducers from '../../../shared/reducers';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { UploadCategoryType } from 'app/shared/models/enums/upload-category-type';

@Component({
  selector: 'hb-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  @Input() post: Post;
  @Input() postMenuColor: PostHairMenu;
  @Input() postMenuParm: PostHairMenu;

  @Output() previous = new EventEmitter<number>();
  @Output() next = new EventEmitter<number>();

  uploadCategories: any[];
  postSubscription: Subscription;

  constructor( @Optional() @Inject(MD_DIALOG_DATA) public data: any, private store: Store<Reducers.State>, private activedRoute: ActivatedRoute) {
    this.uploadCategories = Object.keys(UploadCategoryType).filter(String);
    // console.log(this.uploadCategories);

    if (data) {
      this.setPostData(data);
    } else {
      activedRoute.params.subscribe(params => {
        console.log(params);

        const postId = +params['postId'];
        this.postSubscription = this.store.select(Reducers.userPost).subscribe(post => {
          if (post) {
            this.setPostData(post);
          }
        });
        this.store.dispatch(new UserActions.GetPost(postId));
      })
    }
  }

  setPostData(post: Post) {
    this.post = post;
    this.postMenuColor = post.postHairMenus.find(x => x.hairMenuId === 2);
    this.postMenuParm = post.postHairMenus.find(x => x.hairMenuId === 3);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  onPrevious(postId) {
    if (this.postSubscription) {
      if (this.post.currentUploadIndex > 0) {
        this.post.currentUploadIndex--;
      }
    } else {
      this.previous.emit(postId);
    }
  }

  onNext(postId) {
    if (this.postSubscription) {
      if (this.post.currentUploadIndex < this.post.postUploads.length - 1) {
        this.post.currentUploadIndex++;
      }
    } else {
      this.next.emit(postId);
    }
  }

}
