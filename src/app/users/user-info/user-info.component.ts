import { Component, OnInit } from '@angular/core';
import { Auth } from 'app/shared/auth/auth.service';

@Component({
  selector: 'hb-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(public auth: Auth) { }

  ngOnInit() {
  }

}
