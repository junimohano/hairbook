import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as PostActions from '../shared/user-actions';
import * as Reducers from '../../shared/reducers';
import { Observable } from 'rxjs/Observable';

import { MdDialog, MdDialogRef } from '@angular/material';
import { PostDetailComponent } from 'app/users/post-detail/post-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'hb-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]>;
  currentPostCount: Observable<number>;

  constructor(private store: Store<Reducers.State>, public dialog: MdDialog, private router: Router) {
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

  openPost(post: Post) {

    this.router.navigate(['/users', 'detail', post.postId]);

    // const dialogRef = this.dialog.open(PostDetailComponent, {
    //   height: '700px',
    //   width: '500px',
    //   data: post
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   // this.selectedOption = result;
    // });
  }

}
