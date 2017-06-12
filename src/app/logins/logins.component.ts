import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../shared/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'hb-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.scss']
})
export class LoginsComponent implements OnInit {

  param = { value: 'world' };

  constructor(public router: Router, private auth: Auth, private translate: TranslateService) {

  }

  login() {
    this.auth.login();
  }

  ngOnInit() {
    this.auth.logout();
  }

  setLanguage(lang) {
    this.translate.use(lang);
  }

}
