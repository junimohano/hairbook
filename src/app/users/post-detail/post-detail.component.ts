import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

import { Store } from '@ngrx/store';
import * as PostActions from '../shared/user-actions';
import * as Reducers from '../../shared/reducers';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'hb-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post: Post;
  postMenuColor: PostHairMenu;
  postMenuParm: PostHairMenu;

  // constructor( @Inject(MD_DIALOG_DATA) public data: any, private store: Store<Reducers.State>) {
  constructor(private store: Store<Reducers.State>, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('aaaaaaaaaaaaaaaaaaa:', params['id']);
      this.store.dispatch(new PostActions.GetPost(Number(params['id'])));

      this.store.select(Reducers.selectPost).subscribe((p: Post) => {
        this.post = p;
        console.log('bbbbbbbbbbbbbbbb:', this.post);

        if (this.post) {
          this.postMenuColor = this.post.postHairMenus.find(x => x.hairMenuId === 2);
          this.postMenuParm = this.post.postHairMenus.find(x => x.hairMenuId === 3);
        }

      });

    });
  }

  previous() {
    this.store.dispatch(new PostActions.PreviousUploadIndex(this.post.postId));
  }

  next() {
    this.store.dispatch(new PostActions.NextUploadIndex(this.post.postId));
  }

}
