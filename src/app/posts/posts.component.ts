import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as Reducers from '../shared/reducers';
import * as SharedActions from '../shared/shared-actions';

@Component({
  selector: 'hb-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PostsComponent implements OnInit {

  constructor(private store: Store<Reducers.State>) { }

  ngOnInit() {
    this.store.dispatch(new SharedActions.SetIsPreventRefreshingPosts(true));
  }

}
