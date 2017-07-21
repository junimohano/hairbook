import { Auth } from '../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hb-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userName = '';

  constructor(private auth: Auth) {
    this.userName = this.auth.userName;
  }

  ngOnInit() {
  }

}
