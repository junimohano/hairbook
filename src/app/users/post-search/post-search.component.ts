import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserActions from '../shared/user-actions';
import * as SharedActions from '../../shared/shared-actions';
import * as Reducers from '../../shared/reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'hb-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.scss']
})
export class PostSearchComponent implements OnInit {

  search: string;

  constructor(private store: Store<Reducers.State>) {
  }

  valueChange(newValue) {
    console.log('search : ', newValue);

    this.store.dispatch(new UserActions.SearchPost(this.search));
  }

  ngOnInit() {
  }


}
