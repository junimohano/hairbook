import { Component, OnInit } from '@angular/core';
import { PostService } from './shared/post.service';

import { Store } from '@ngrx/store';
import * as PostActions from './shared/post-actions';
import * as Reducers from '../shared/reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'hb-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Observable<Post[]>;
  currentIndex: Observable<number>;

  constructor(private store: Store<Reducers.State>) {
    this.posts = store.select(Reducers.selectPosts);
    this.currentIndex = store.select(Reducers.selectCurrentIndex);
  }

  ngOnInit() {

    this.currentIndex.subscribe(result => {
      console.log("currentindex : " + result);
    });
    // this.postService.getPosts()
    //   .subscribe(result => {
    //     this.posts = result;
    //   }, error => alert(error));
  }

  test() {
    this.store.dispatch(new PostActions.SearchPost());
  }

}
