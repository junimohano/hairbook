import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Reducers from '../../reducers';
import * as SharedActions from '../../shared-actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'hb-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss']
})
export class ProgressCircleComponent implements OnInit {

  isCircleProgress: Observable<boolean>;

  constructor(private store: Store<Reducers.State>) {
    this.isCircleProgress = this.store.select(Reducers.selectCircleProgress);
  }

  ngOnInit() {
    this.isCircleProgress.subscribe((x) => {
      console.log('selectCircleProgress : ', x);
    });
  }

}
