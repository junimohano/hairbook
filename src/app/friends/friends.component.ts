import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hb-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FriendsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
