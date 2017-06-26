import { Component, OnInit, Input } from '@angular/core';
import { Auth } from 'app/shared/auth/auth.service';
import { User } from 'app/shared/models/user';

@Component({
  selector: 'hb-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() user: User;

  constructor(public auth: Auth) { }

  ngOnInit() {
  }

}
