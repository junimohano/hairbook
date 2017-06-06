import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hb-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.scss']
})
export class LoginsComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/posts']);
  }

}
