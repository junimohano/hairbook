import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hb-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  @Input() isProgressBar: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
