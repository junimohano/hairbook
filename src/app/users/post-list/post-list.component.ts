import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as PostActions from '../shared/user-actions';
import * as Reducers from '../../shared/reducers';
import { Observable } from 'rxjs/Observable';

import { MdDialog, MdDialogRef } from '@angular/material';
import { PostDetailComponent } from 'app/users/post-detail/post-detail.component';

@Component({
  selector: 'hb-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]>;
  currentPostCount: Observable<number>;

  constructor(private store: Store<Reducers.State>, public dialog: MdDialog) {
    this.posts = store.select(Reducers.selectPosts);
    this.currentPostCount = store.select(Reducers.selectCurrentPostCount);
  }

  ngOnInit() {
    this.currentPostCount.subscribe(result => {
      console.log('currentPostCount : ' + result);
    });

    this.store.dispatch(new PostActions.SearchPost());

    // this.postService.getPosts()
    //   .subscribe(result => {
    //     this.posts = result;
    //   }, error => alert(error));
  }

  previous(i: number) {
    this.store.dispatch(new PostActions.PreviousUploadIndex(i));
  }

  next(i: number) {
    this.store.dispatch(new PostActions.NextUploadIndex(i));
  }

  openPost(post: Post) {
    const dialogRef = this.dialog.open(PostDetailComponent, {
      // height: '400px',
      // width: '600px',
      data: post
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.selectedOption = result;
    });
  }

}
