import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Auth } from 'app/shared/auth/auth.service';
import { User } from 'app/shared/models/user';

@Component({
  selector: 'hb-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnChanges {

  @Input() user: User;
  @Input() isMe: boolean;

  constructor(public auth: Auth) {
  }

  ngOnInit() {

  }

  ngOnChanges() {
  }

}
