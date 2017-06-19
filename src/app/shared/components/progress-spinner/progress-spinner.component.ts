import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hb-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit {

  @Input() isProgressSpinner: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
