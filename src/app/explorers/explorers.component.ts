import { Component, OnInit, HostListener, Inject } from '@angular/core';

import { Store } from '@ngrx/store';
import * as ExplorerActions from './shared/explorer-actions';
import * as SharedActions from '../shared/shared-actions';
import * as Reducers from '../shared/reducers';
import { Observable } from 'rxjs/Observable';

import { PostDetailComponent } from 'app/users/post-detail/post-detail.component';
import { Router } from '@angular/router';
import { Post } from 'app/users/shared/models/post';

@Component({
  selector: 'hb-explorers',
  templateUrl: './explorers.component.html',
  styleUrls: ['./explorers.component.scss']
})
export class ExplorersComponent implements OnInit {

  posts: Observable<Post[]>;
  currentPostCount: Observable<number>;

  constructor(private store: Store<Reducers.State>, private router: Router) {
    this.posts = store.select(Reducers.selectExplorerPosts);
    this.currentPostCount = store.select(Reducers.selectCurrentExplorerPostCount);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.store.dispatch(new ExplorerActions.SearchPost());
    }

  }

  ngOnInit() {
    this.store.dispatch(new ExplorerActions.SearchPost());
  }

}
