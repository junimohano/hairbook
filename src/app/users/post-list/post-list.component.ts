import { Component, OnInit, HostListener, Inject } from '@angular/core';

import { Store } from '@ngrx/store';
import * as PostActions from '../shared/user-actions';
import * as SharedActions from '../../shared/shared-actions';
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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // console.log('22');
      this.store.dispatch(new PostActions.SearchPost());
    }


    // if (document.documentElement.scrollTop + document.documentElement.offsetHeight > document.documentElement.scrollHeight) {
    //   console.log('111');
    // }

    // // In chrome and some browser scroll is given to body tag
    // const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    // const max = document.documentElement.scrollHeight;
    // // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    // if (pos === max) {
    //   // Do your action here
    //   console.log('reach');

    // }
  }

  ngOnInit() {

    this.currentPostCount.subscribe(result => {
      console.log('currentPostCount : ' + result);
    });

    this.store.dispatch(new PostActions.SearchPost());

    // this.posts.subscribe(() => {
    //   setTimeout(() => {
    //     // this.store.dispatch(new SharedActions.SetProgress(false));
    //     // this.store.dispatch(new SharedActions.SetCircleProgress(false));

    //   }, 1000);

    // });

    // this.postService.getPosts()
    //   .subscribe(result => {
    //     this.posts = result;
    //   }, error => alert(error));
  }

  openPost(post: Post) {

    this.router.navigate(['/users', 'post', post.postId]);

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
