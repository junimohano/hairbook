import { Auth } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'hb-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userName = '';

  constructor(private auth: Auth, private location: Location) {
    this.userName = this.auth.userName;
  }

  ngOnInit() {
  }

  onClickBack() {
    this.location.back();
  }

}
