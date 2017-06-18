import { Component, OnInit, HostListener, Inject } from '@angular/core';

import { Store } from '@ngrx/store';
import * as PostActions from '../shared/user-actions';
import * as SharedActions from '../../shared/shared-actions';
import * as Reducers from '../../shared/reducers';
import { Observable } from 'rxjs/Observable';

import { MdDialog, MdDialogRef } from '@angular/material';
import { PostDetailComponent } from 'app/users/post-detail/post-detail.component';
import { Router } from '@angular/router';
import { Post } from 'app/users/shared/models/post';

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
      this.store.dispatch(new PostActions.SearchPost());
    }

  }

  ngOnInit() {

    this.store.dispatch(new PostActions.SearchPost());

    // });

    // this.postService.getPosts()
    //   .subscribe(result => {
    //     this.posts = result;
    //   }, error => alert(error));
  }

  openPost(post: Post) {

    // this.router.navigate(['/users', 'post', post.postId]);

    const dialogRef = this.dialog.open(PostDetailComponent, {
      height: '700px',
      width: '500px',
      data: post.postId
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.selectedOption = result;
    });
  }

}
