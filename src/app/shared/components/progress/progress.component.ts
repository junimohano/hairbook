import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Reducers from '../../reducers';
import * as SharedActions from '../../shared-actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'hb-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressComponent implements OnInit {
  isAppProgress: Observable<boolean>;

  constructor(private store: Store<Reducers.State>) {
    this.isAppProgress = this.store.select(Reducers.selectAppProgress);
  }

  ngOnInit() {
    this.isAppProgress.subscribe((x) => {
      console.log(x);
    });
  }

}
