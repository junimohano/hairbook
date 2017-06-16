import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Reducers from '../../reducers';
import * as SharedActions from '../../shared-actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'hb-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private store: Store<Reducers.State>) { }

  ngOnInit() {
  }




}
