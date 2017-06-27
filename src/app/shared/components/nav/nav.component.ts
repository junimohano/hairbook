import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hb-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userName = '';

  constructor() {
    this.userName = sessionStorage.getItem('userName');
  }

  ngOnInit() {
  }

}
