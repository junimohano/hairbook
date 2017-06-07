import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../shared/auth/auth.service';

@Component({
  selector: 'hb-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.scss']
})
export class LoginsComponent implements OnInit {

  constructor(public router: Router, private auth: Auth) {

  }

  login() {
    this.auth.login();
  }

  ngOnInit() {
    if (this.auth.authenticated()) {
      this.router.navigate(['/posts']);
    }
  }

}
