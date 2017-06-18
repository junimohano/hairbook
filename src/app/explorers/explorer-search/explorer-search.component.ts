import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as ExplorerActions from '../shared/explorer-actions';
import * as SharedActions from '../../shared/shared-actions';
import * as Reducers from '../../shared/reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'hb-explorer-search',
  templateUrl: './explorer-search.component.html',
  styleUrls: ['./explorer-search.component.scss']
})
export class ExplorerSearchComponent implements OnInit {
  search: string;

  constructor(private store: Store<Reducers.State>) {
  }

  valueChange(newValue) {
    console.log('search : ', newValue);

    this.store.dispatch(new ExplorerActions.SearchPost(this.search));
  }

  ngOnInit() {
  }

}
